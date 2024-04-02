const express = require('express');
const router = express.Router();
const {Event} = require('../models');

router.get('/', async (req, res) => {
    const listOfEvents = await Event.findAll();
    res.json(listOfEvents);
});



router.post('/', async (req, res) => {
    const event = req.body;
    await Event.create(event);
    res.json(event);
});

module.exports = router;