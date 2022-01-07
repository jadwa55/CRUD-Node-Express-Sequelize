/*                              User Route                           */
/* -------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const { User } = require('../models')

router
    .route('/users/departement/:deparId')
    .get((rep, res) => {
        User.findAll({ where: { departementId: rep.params.deparId } }).then(user => { 
            res.render('user/home', {
                'users' : user
            });
        })
    })

router
    .route('/user/create/:deparId')
    .get((rep, res) => {
        res.render('user/create')
    })

    .post((rep,res) => {
        User.create(rep.body).then(dep => {
            res.redirect('/user')
        })
    })





module.exports = router
