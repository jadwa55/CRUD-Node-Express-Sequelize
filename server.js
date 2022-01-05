// const path = require('path');
const express = require('express');
const ejs = require('ejs');
// const bodyParser = require('body-parser');
// const mysql = require('mysql2');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

// MIddleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Testiiiiiiiiiiiiing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hell!!!." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




