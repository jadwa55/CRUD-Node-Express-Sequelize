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

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});













app.listen(5000, () => {
    console.log('Server is running at port 5000');
});