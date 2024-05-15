const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');



router.get('/', async (req, res) => {
    const listOfUsers = await User.findAll();
    res.json(listOfUsers);
});

router.post('/', async (req, res) => {
    const { Role, UserName, Password, Email, Department, Phone, ManagerEmail } = req.body;
    bcrypt.hash(Password, 10).then((hash)=> {
        User.create({
            Role: Role,
            UserName: UserName,
            Password: hash,
            Email: Email,
            Department: Department,
            Phone: Phone,
            ManagerEmail: ManagerEmail,
        })
        res.json("SUCCESS");
    });
    
    
});

module.exports = router;
