const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());
const db = require("./models");

// Routers
const AddEvent_Router = require('./routes/AddEvent');
const ManageUser_Router = require('./routes/ManageUser');
app.use("/AddEvent", AddEvent_Router);
app.use("/ManageUser", ManageUser_Router);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });



