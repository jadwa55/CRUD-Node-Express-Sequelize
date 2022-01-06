const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const Gig = require('../models/departementModel');
const Sequelize = require('sequelize');
const { Departement } = require('../models');
const departement = require('../models/departementModel');
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
  let { name, description } = req.body;
  let errors = [];

  // Validate Inputs
  if(!name) {
    errors.push({ text: 'Please add a name' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      name, 
      description
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Insert into table
    Departement.create({
      name,
      description
    })
      .then(departement => res.redirect('/departement'))
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