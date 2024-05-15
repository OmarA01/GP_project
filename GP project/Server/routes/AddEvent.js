const express = require('express');
const multer = require('multer');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const router = express.Router();
const passport = require('passport');
const { User, Event, Attendance, Report, Image } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const upload = multer();

//////////////////////////////////  Set up SendGrid (main sender) ///////////////////////////////

const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailNotification = (email, event) => {
    const loginUrl = 'http://localhost:3000/?redirect=/PendingEvents';

    const msg = {
        to: email,//[] to multiple people
        from: {
          name: 'Psut Events',
          email: process.env.FROM_EMAIL
        }, // Use the email address or domain you verified above
        subject: 'Event Approval Needed',
        text: `An event "${event}" needs your approval. Please log in to the system to accept or reject it.`,
        html: `
            <p>An event "<strong>${event}</strong>" needs your approval.</p>
            <p>Please log in to the system to accept or reject it.</p>
            <p><a href="${loginUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Login to Approve Event</a></p>
        `
      };

      const sendMail = async () => {
        try {
          await sgMail.send(msg);
          console.log('Email has been sent successfully');
        } catch (error) {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        }
    }

    sendMail();
}

/*router.get('/hehe', async (req, res) => {
    const user = await User.findOne({
        where: {
            Role: 5,
            Email: "holymoly4400@gmail.com"
        }
    });

    if(user){
        sendEmailNotification(user.Email, 'now????');
    }
    res.json('email send');
})*/
///////////////////////////////// Get routes ///////////////////////////////////////////////

router.get('/ViewEvents', validateToken, async (req, res) => { // Route to return Events (Accepted/Rejected/Finished)
    const userRole = req.user.Role;
    
    if(userRole == 4 || userRole == 3 ){
        try{
            const listOfEvents = await Event.findAll({
                where: {
                    Type: { [Op.in]: ['1', '6', '7'] }
                }
            });

            res.json(listOfEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    else{
        try {
            const managedUsers = await User.findAll({
                where: {
                    ManagerEmail: req.user.Email
                },
                attributes: ['Email']
            });

            const managedUserEmails = managedUsers.map(user => user.Email);
            managedUserEmails.push(req.user.Email);

            const listOfEvents = await Event.findAll({
                where: {
                    UserEmail: { [Op.in]: managedUserEmails },
                    Type: { [Op.in]: ['1', '6', '7'] }
                }
            });

            res.json(listOfEvents);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.get('/TrackEvents', validateToken, async (req, res) => { // Route to return Events for certain User
    const listOfEvents = await Event.findAll({
        where: {
            UserEmail: req.user.Email, 
            Type: { [Op.notIn]: ['1', '6', '7'] }
        }
    });
    res.json(listOfEvents);
});

router.get('/EventEvaluation', validateToken, async (req, res) => { // Route to return Events (Finished)
    try{
        const listOfEvents = await Event.findAll({
            where: {
                Type: { [Op.in]: ['7'] }
            }
        });
        res.json(listOfEvents);
    }
    catch(error){
        console.error('Failed to fetch events:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.get('/Calendar', validateToken, async (req, res) => { // Route to return all Events for the calendar
    try {
        const listOfEvents = await Event.findAll({
            where: {
                Type: { [Op.in]: ['1','7'] }
            }
        });
        const formattedEvents = listOfEvents.map(event => ({
            id: event.ActivityID,
            title: event.ActivityName,
            start: new Date(`${event.DateOfEvent.toISOString().split('T')[0]}T${event.StartTime}`),
            end: new Date(`${event.DateOfEvent.toISOString().split('T')[0]}T${event.FinishTime}`),
            Organizer: event.Organizer,
            Location: event.Location,
            NumberOfAudience: event.NumberOfAudience,
            FinancingValue: event.FinancingValue,
            FinancingEntity: event.FinancingEntity
        }));
        res.status(200).json(formattedEvents);
    } 
    catch (error) {
        console.error('Failed to fetch events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/byId/:id', validateToken, async (req, res) => { // Route to return specific Event
    try {
        const eventId = req.params.id;
        const event = await Event.findByPk(eventId, {
            include: [{
                model: Attendance, // Include the Attendance model
                as: 'attendances' // This 'as' must match the alias defined in your associations if used
            }]
        });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/PendingEvents', validateToken, async (req, res) => {  // Route to return events that needs approval from certain manager
    const userRole = req.user.Role;
    if(userRole == 1 || userRole == 6){
        res.status(403).json({error: "This user cant accept/reject events"});
    }
    else{
        if(userRole == 5){
            try {
                const managerEmail = req.user.Email;

                const managedUsers = await User.findAll({ where: { ManagerEmail: managerEmail } });
                const managedUserEmails = managedUsers.map(user => user.Email);

                const pendingEvents = await Event.findAll({
                    where: {
                        UserEmail: managedUserEmails,
                        Type: userRole,
                    },
                });

                res.json(pendingEvents);
            } 
            catch (error) {S
                console.error("Error fetching pending events:", error);
                res.status(500).json({ error: "Internal server error" });
            }
    }
    else{
        try {
            const pendingEvents = await Event.findAll({where: {Type: userRole,}});
            res.json(pendingEvents);
        } 
        catch (error) {
            console.error("Error fetching pending events:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    }

});

//////////////////////////////////    Post Routes     /////////////////////////////////////

router.post('/', validateToken, async (req, res) => { // Route to create an event
    const type = req.user.Role - 1;

    const { ActivityName, Organizer, DateOfEvent, Location, StartTime, FinishTime, AudienceNames, vipVisitors } = req.body;
    
    function formatTimeForSQL(timeString) {
        return moment(timeString, 'HH:mm:ss').format('HH:mm:ss');
    } 

    const formattedStartTime = formatTimeForSQL(req.body.StartTime);
    const formattedFinishTime = formatTimeForSQL(req.body.FinishTime);

    console.log("this is date",DateOfEvent,"and this is start",formattedStartTime,"and this is finish",formattedFinishTime);

    try{
        const overlappingEvent = await Event.findOne({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('DateOfEvent')), '=', DateOfEvent), 
                    { Location },
                    { [Op.not]: { Type: ['6', '7'] } }, 
                    {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    { StartTime: { [Op.lte]: formattedFinishTime } },
                                    { FinishTime: { [Op.gte]: formattedStartTime } }
                                ]
                            }
                        ]
                    }
                ]
            }
        });

        if (overlappingEvent) {
            console.log(overlappingEvent);
            return res.status(400).json({error: 'An event already exists at the same date, time, and location'});
        }
        console.log("code reches this part");
        const newEvent = await Event.create({
            Type: type,
            ActivityName: req.body.ActivityName,
            Organizer: req.body.Organizer,
            DateOfEvent: req.body.DateOfEvent,
            Location: req.body.Location,
            StartTime: formattedStartTime,
            FinishTime: formattedFinishTime,
            NumberOfAudience: req.body.NumberOfAudience,
            FinancingValue: req.body.FinancingValue,
            FinancingEntity: req.body.FinancingEntity,
            UserEmail: req.user.Email
        });

        const audiencePromises = AudienceNames.map(async (name) => {
            await Attendance.create({
                Name: name,
                IsVIP: false, 
                ActivityID: newEvent.ActivityID, 
            });
        });

        const vipVisitorPromises = vipVisitors.map(async (visitor) => {
            await Attendance.create({
                Name: visitor.Name,
                IsVIP: true, 
                Phnoe: visitor.Phone, 
                Flight_Number: visitor.Flight_Number,
                Flight_Date: visitor.Flight_Date,
                ActivityID: newEvent.ActivityID, 
            });
        });

        await Promise.all([...audiencePromises, ...vipVisitorPromises]);

        if(type == 5){
            const user = await User.findOne({
                where: {
                    Role: type,
                    Email: req.user.ManagerEmail
                }
            });

            if(user){
                sendEmailNotification(user.Email, newEvent.ActivityName);
            }
        }
        else if(type < 5 && type >= 2){
            const user = await User.findOne({
                where: {
                    Role: type
                }
            });

            if(user){
                sendEmailNotification(user.Email, newEvent.ActivityName);
            }
        }

        //console.log(req.user, req.body);
        res.send(200);

    }
    catch (error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/AddReport/:id', validateToken, upload.array('images'), async (req, res) => { // Route to add a Report
    const eventId = req.params.id; 
    const { Event_Duration, NumberOfAttendence, Evaluation } = req.body;

    try {
        const newReport = await Report.create({
            EventID: eventId,
            Event_Duration,
            NumberOfAttendence,
            Evaluation,
        });

        // Handling image uploads
        if (req.files) {
            await Promise.all(req.files.map(async (file) => {
                await Image.create({
                    imageData: file.buffer,
                    reportId: newReport.EventID
                });
            }));
        }

        res.status(201).send({ message: "Report and images added successfully", reportId: newReport.ReportID });
    } catch (error) {
        console.error('Error adding report and images:', error);
        res.status(500).send({ error: 'Failed to add report and images' });
    }
});


////////////////////////////////////////     Put Routes    ////////////////////////////////////////////

router.put('/AcceptEvent/:id', validateToken, async (req, res) => { // Route to accept events
    const userRole = req.user.Role;
    const id = req.params.id;
    if(userRole == 1 || userRole == 6){
        res.status(403).json({error: "This user cant accept/reject events"});
    }
    else{
        try{
            const event = await Event.findByPk(id);
            if(!event) res.status(404).json({error: "Event not found"});

            const eventType = event.Type - 1;
            await event.update({Type: eventType});
            if(eventType >= 2 && eventType <=5){
                const user = await User.findOne({
                    where: {
                        Role: eventType
                    }
                });

                if(user){
                    sendEmailNotification(user.Email, event.ActivityName);
                }
            }
            res.status(200).json({message: "Event accepted successfully"});
        }
        catch (error){
            console.error("Error accepting event: ", error);
            res.status(500).json({error: "Internal server error"});
        }
    }

});

router.put('/RejectEvent/:id', validateToken, async (req, res) => { // Route to reject events
    const userRole = req.user.Role;
    const id = req.params.id;
    if(userRole == 1 || userRole == 6){
        res.status(403).json({error: "This user cant accept/reject events"});
    }
    else{
        try{
            const event = await Event.findByPk(id);
            if(!event) res.status(404).json({error: "Event not found"});

            const eventType = 6;
            await event.update({Type: eventType});
            res.status(200).json({message: "Event rejected successfully"});
        }
        catch (error){
            console.error("Error rejecting event: ", error);
            res.status(500).json({error: "Internal server error"});
        }
    }

});

///////////////////////////////////////// cron schedule ////////////////////////////////

cron.schedule('* * * * *', async () => {
    try {
        const now = moment();
        const listOfEvents = await Event.findAll({
            where: {
                Type: '1'
            }
        });

        const eventsToUpdate = listOfEvents.filter(event => {
            const dateOfEvent = moment(event.DateOfEvent).format('YYYY-MM-DD');
            const finishTime = event.FinishTime;

            const eventFinishDateTimeStr = `${dateOfEvent} ${finishTime}`;
            const eventFinishDateTime = moment(eventFinishDateTimeStr, 'YYYY-MM-DD HH:mm:ss');
           
            return now.isAfter(eventFinishDateTime);
        });

        await Promise.all(eventsToUpdate.map(async (event) => {
            await event.update({ Type: '7' });
        }));

        console.log(`Checked and updated events at ${now.format('YYYY-MM-DD HH:mm:ss')}`);
    } catch (error) {
        console.error('Error updating event types:', error);
    }
});

module.exports = router;