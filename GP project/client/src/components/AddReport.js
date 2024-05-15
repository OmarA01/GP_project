import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

const AddReport = () => {
    let { id } = useParams(); // Event ID from the URL

    const [files, setFiles] = useState([]);

    // Initial values for the form
    const initialValues = {
        Event_Duration: '',
        NumberOfAttendence: '',
        Evaluation: '',
    };

    // Validation schema
    const validationSchema = Yup.object().shape({
        Event_Duration: Yup.number().required('Event duration is required').min(1, 'Event duration must be at least 1 minute'),
        NumberOfAttendence: Yup.number().required('Number of attendees is required').min(1, 'There must be at least one attendee'),
        Evaluation: Yup.string().required('Evaluation is required'),
    });

    // Handle file change
    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    // Handle form submission
    const onSubmit = (values) => {
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        for (const file of files) {
            console.log(file);
            formData.append('images', file);
        }

        axios.post(`http://localhost:3001/AddEvent/AddReport/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if (response.data.error) {
                console.error(response.data.error);
            } else {
                console.log("Report added successfully", values);
                // Optionally redirect or give feedback
            }
        }).catch(error => {
            console.error("Failed to add report", error);
        });
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="Event_Duration"
                            type="number"
                            label="Event Duration (minutes)"
                            helperText={touched.Event_Duration ? errors.Event_Duration : ""}
                            error={touched.Event_Duration && Boolean(errors.Event_Duration)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <Field
                            as={TextField}
                            name="NumberOfAttendence"
                            type="number"
                            label="Number of Attendees"
                            helperText={touched.NumberOfAttendence ? errors.NumberOfAttendence : ""}
                            error={touched.NumberOfAttendence && Boolean(errors.NumberOfAttendence)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <Field
                            as={TextField}
                            name="Evaluation"
                            type="text"
                            label="Evaluation"
                            helperText={touched.Evaluation ? errors.Evaluation : ""}
                            error={touched.Evaluation && Boolean(errors.Evaluation)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                        />
                        <Button type="submit" color="primary" variant="contained">Submit Report</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddReport;
