const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const store = new session.MemoryStore();
const passport = require('passport');
const local = require('./Strategies/local')

const db = require("./models");

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'testing',
  cookie: { 
    maxAge: 300000,
  },
  saveUninitialized: false,
  store
}))
app.use(passport.initialize());
app.use(passport.session());




app.use((req, res, next) => {

  next();
});




// Routers --------------------------------------------- localhost:3001/
const AddEvent_Router = require('./routes/AddEvent');
const ManageUser_Router = require('./routes/ManageUser');
const Login_Router = require('./routes/login');
app.use("/AddEvent", AddEvent_Router);
app.use("/ManageUser", ManageUser_Router);
app.use("/login", Login_Router);



db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
});



