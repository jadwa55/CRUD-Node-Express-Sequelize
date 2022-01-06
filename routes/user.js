/*                              User Route                           */
/* -------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const { User } = require('../models')

router
    .route('/users/departement/:deparId')
    .get((rep, res) => {
        User.findAll().then(user => { 
            res.render('user/home', {
                'users' : user
            });
        })
    })





module.exports = router
