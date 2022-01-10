/*                              User Route                           */
/* -------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const { User } = require('../models')

router
    .route('/users/departement/:deparId')
    .get((rep, res) => {
        User.findAll({ where: { departementId: rep.params.deparId } }).then(user => { 
            let salah =  rep.params.deparId;
            res.render('user/home', {
                'mosiba' : rep.params.deparId,
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
        User.create(rep.body).then(user => {
            res.redirect('/user')
        })
    })

router
    .route('/user/edit/:id')
    .get((rep, res) => {
        User.findOne({
            where: { id: rep.params.id }
        }).then(user => {
           res.render('user/edit',{
              user : user  
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
