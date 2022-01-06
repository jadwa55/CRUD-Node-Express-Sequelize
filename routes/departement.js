const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const Gig = require('../models/departementModel');
const Sequelize = require('sequelize');
const { Departement } = require('../models');
const departementModel = require('../models/departementModel');
const Op = Sequelize.Op;

// Get depar list
router.get('/', (req, res) => 
  Departement.findAll()
    .then(departement => res.render('departement', {
        departement
      }))
    .catch(err => res.render('error', {error: err})));

// Add a depar
router.post('/add', (req, res) => {
  let { name, technologies, description } = req.body;
  let errors = [];

  // Validate Inputs
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => res.render('error', {error:err.message}))
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;