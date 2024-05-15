const express = require('express');
const passport = require('passport');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware')


router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.post('/', async (req, res) => { 
    const { Email, Password } = req.body;
    const user = await User.findOne({where: {Email: Email}});

    if(!user) res.status(404).json({error: "wrong Email and password combination"});
    else{
        bcrypt.compare(Password, user.Password).then((match) => {
            if(!match) res.status(401).json({error: "wrong Email and password combination"});
            else {
                const accessToken = sign(
                    {username: user.UserName, Email: user.Email, Role: user.Role, ManagerEmail: user.ManagerEmail},
                    "tamam",
                    {expiresIn: '30m'}
                );
                res.json({token: accessToken, username: user.UserName, Role: user.Role});
            }
        });
    }
});

module.exports = router;