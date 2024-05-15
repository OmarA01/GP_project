import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, FastField, Field, ErrorMessage, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField, Button} from '@mui/material'
import '../CssFiles/AddEvent.css';
import {useState} from "react";
import axios from 'axios';

function AddEvent() {
    /*const [presidentsApproval, setPresidentsApproval] = useState(false);
    const [vipVisitor, setVipVisitor] = useState(false);
    const [vipFromAbroad, setVipFromAbroad] = useState(false);

    const handlePresidentsApprovalChange = (event) => {
        setPresidentsApproval(event.target.checked);
    };

    const handleVipVisitorChange = (event) => {
        setVipVisitor(event.target.checked);
    };

    const handleVipFromAbroadChange = (event) => {
        setVipFromAbroad(event.target.checked);
    };*/

   
    const navigate = useNavigate();
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() /*+ 7*/)).toISOString().split('T')[0];
    
    const initialValues = {
        Type: 1,
        ActivityName: '',
        Organizer: '',
        DateOfEvent: '',
        Location: '',
        StartTime: '',
        FinishTime: '',
        FinancingValue: '',
        FinancingEntity: '',
        NumberOfAudience: 0,
        AudienceNames: [],
        vipVisitors: [
            { Name: '', Phone: '', Flight_Number: '', Flight_Date: '' } 
        ],
    };

    const validationSchema = Yup.object().shape({
        ActivityName: Yup.string().required(),
        Organizer: Yup.string().required(),
        DateOfEvent: Yup.date().required().min(new Date(), 'Event date must be in the future'),
        Location: Yup.string().required(),
        StartTime: Yup.string().required(),
        FinishTime: Yup.string().required().test('is-greater', 'Finish time must be after start time', function(value) {
            const { StartTime } = this.parent;
            return !StartTime || !value || value > StartTime;
          }),
        FinancingValue: Yup.number().positive().required(),
        FinancingEntity: Yup.string().required(),
        NumberOfAudience: Yup.number().positive().required(),
        AudienceNames: Yup.array().of(Yup.string()),
        vipVisitors: Yup.array().of(Yup.object().shape({
            Name: Yup.string(),
            Phone: Yup.string(),
            Flight_Number: Yup.string(),
            Flight_Date: Yup.string(),
        }))
               
        
    });
    const [vipChecked, setVipChecked] = useState(false);
    const [abroadCheckedArray, setAbroadCheckedArray] = useState(Array(initialValues.vipVisitors.length).fill(false));
    
    const handleVipCheckboxChange = (event) => {
        setVipChecked(event.target.checked);
    };      

    const handleAbroadCheckboxChange = (index) => {
        const newAbroadCheckedArray = [...abroadCheckedArray];
        newAbroadCheckedArray[index] = !newAbroadCheckedArray[index];
        setAbroadCheckedArray(newAbroadCheckedArray);
    };

    const onSubmit = (data) => {
        
        axios.post("http://localhost:3001/AddEvent", data, {headers: {accessToken: localStorage.getItem("accessToken")}} ).then((response) => {
            if(response.data.error) 
                console.log(response.data.error);
            else {
                console.log("worked", data);
                navigate('/TrackEvents', {state: {message: 'Event added successfully'}});
            }
        }).catch(error => {
            if(error.response)
                alert(error.response.data.error)
            else if(error.request)
                alert(error.request)
            else
                alert(error.message)
        })
        
    };

    return (
        <div className="addEvent">
            <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            >
               {(formik) => (
                    <Form>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>ActivityName: </label> 
                                <ErrorMessage name="ActivityName" component="div" className="error-message" />
                                <Field 
                                    id="ActivityName"
                                    name="ActivityName"
                                    type="text"
                                    placeholder="Enter activity name"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Organizer: </label> 
                                <ErrorMessage name="Organizer" component="div" className="error-message" />
                                <Field 
                                    id="Organizer"
                                    name="Organizer"
                                    type="text"
                                    placeholder="Ex: Omar"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>DateOfEvent: </label> 
                                <ErrorMessage name="DateOfEvent" component="div" className="error-message" />
                                <Field 
                                    id="DateOfEvent"
                                    name="DateOfEvent"
                                    type="date"
                                    InputProps={{
                                        inputProps: { 
                                            min: minDate  // Ensure the minimum date is set correctly here
                                        }
                                    }}
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>Location: </label> 
                                <ErrorMessage name="Location" component="div" className="error-message"/>
                                <Field 
                                    id="Location"
                                    name="Location"
                                    type="text"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>StartTime: </label> 
                                <ErrorMessage name="StartTime" component="div" className="error-message"/>
                                <Field 
                                    id="StartTime"
                                    name="StartTime"
                                    type="time"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                                </div>
                                <div className='col-md-6'>
                                    <label>FinishTime: </label> 
                                    <ErrorMessage name="FinishTime" component="div" className="error-message"/>
                                    <Field 
                                        id="FinishTime"
                                        name="FinishTime"
                                        type="time"
                                        as={TextField}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label>FinancingValue: </label> 
                                <ErrorMessage name="FinancingValue" component="div" className="error-message"/>
                                <Field 
                                    id="FinancingValue"
                                    name="FinancingValue"
                                    type="number"
                                    inputProps={{ 
                                        min: "0",
                                        placeholder: "FinancingValue (JD)",
                                    }}
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                            <div className='col-md-6'>
                                <label>FinancingEntity: </label> 
                                <ErrorMessage name="FinancingEntity" component="div" className="error-message"/>
                                <Field 
                                    id="FinancingEntity"
                                    name="FinancingEntity"
                                    type="text"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <label>NumberOfAudience: </label> 
                        <ErrorMessage name="NumberOfAudience" component="div" className="error-message"/>
                        <Field 
                            id="NumberOfAudience"
                            name="NumberOfAudience"
                            type="number"
                            inputProps={{ min: "0" }}
                            as={TextField}
                            fullWidth
                            variant="outlined"
                        />
                    <br/>
                    <label>VIP Visitors:</label>
                    <Checkbox
                        id="vipCheckbox"
                        name="vipCheckbox"
                        checked={vipChecked}
                        onChange={handleVipCheckboxChange}
                    />
                    {vipChecked && (
                        <FieldArray name="vipVisitors">
                        {(arrayHelpers) => (
                            <div>
                                {/* Field for entering the number of VIP visitors */}
                                <Field
                                    id="numberOfVipVisitors"
                                    name="numberOfVipVisitors"
                                    type="number"
                                    placeholder="Number of VIP visitors"
                                    as={TextField}
                                    fullWidth
                                    variant="outlined"
                                />

                                {/* Dynamically render fields for each VIP visitor */}
                                {formik.values.vipVisitors.map((visitor, index) => (
                                    <div key={index}>
                                        <label>VIP Name:</label>
                                        <Field
                                            name={`vipVisitors.${index}.Name`}
                                            type="text"
                                            as={TextField}
                                            fullWidth
                                            variant="outlined"
                                        />
                                        <label>VIP Phone:</label>
                                        <Field
                                            name={`vipVisitors.${index}.Phone`}
                                            type="text"
                                            as={TextField}
                                            fullWidth
                                            variant="outlined"
                                        />

                                        <label>VIP coming abroad? </label>
                                        <Checkbox
                                            id={`abroadChecked_${index}`}
                                            name={`abroadChecked_${index}`}
                                            checked={abroadCheckedArray[index]}
                                            onChange={() => handleAbroadCheckboxChange(index)}
                                        />
                                        {abroadCheckedArray[index] && (
                                            <div>
                                                <label>Flight Number:</label>
                                                <Field
                                                    name={`vipVisitors.${index}.Flight_Number`}
                                                    type="text"
                                                    as={TextField}
                                                    fullWidth
                                                    variant="outlined"
                                                />

                                                <label>Flight Date:</label>
                                                <Field
                                                    name={`vipVisitors.${index}.Flight_Date`}
                                                    type="date"
                                                    as={TextField}
                                                    fullWidth
                                                    variant="outlined"
                                                />
                                            </div>
                                        )}

                                        {/* Button to remove the VIP visitor */}
                                        <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                            Remove VIP
                                        </button>
                                    </div>
                                ))}

                                {/* Button to add a new VIP visitor */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentNumberOfVisitors = formik.values.vipVisitors.length;
                                        const numberOfVipVisitors = formik.values.numberOfVipVisitors || 0;
                                        if (currentNumberOfVisitors < numberOfVipVisitors) {
                                            arrayHelpers.push({ Name: '', Phone: '', Flight_Number: '', Flight_Date: '' });
                                        }
                                    }}
                                >
                                    Add VIP
                                </button>

                            </div>
                        )}
                    </FieldArray>
                    )}
                        <br/>
                        <button type="submit"> submit </button>
                    </Form>
            )} 
            </Formik>
        </div>
    );
}

export default AddEvent;