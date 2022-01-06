// const path = require('path');
const express = require('express');
const ejs = require('ejs');
const models = require('./models/index');

const app = express();
app.set('view engine', 'ejs');

// MIddleware
app.use(express.json()); // For handler parame of post req sous form json ( string => json)
app.use(express.urlencoded({ extended: true })); // For handler parame of post req

//Testiiiiiiiiiiiiing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hell!!!." });
});

//* Require Routes
const deparRoute = require('./routes/departement');

//* Register Our Routes
app.use('/',deparRoute)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




