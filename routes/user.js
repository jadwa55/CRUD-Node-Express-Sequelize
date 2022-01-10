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

router
    .route('/user/edit/:id')
    .get((rep, res) => {
        User.findOne({
            where: { id: rep.params.id }
        }).then(dep => {
           res.render('depar/edit',{
              user : dep  
           })
        })
    })
    .post((rep, res) => {

        User.findOne({ where: { id: rep.params.id } })
            .then(function (user) {
                user.update({
                    username: rep.body.username,
                    email: rep.body.email,
                    password: res.body.password
                })
                .then(function (updatedUser) {
                    res.redirect('/user/create/:deparId') 
                })
            })

            .catch((e) => console.log(e.message))
    })




module.exports = router
