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
                'userDepaId' : rep.params.deparId,
                'users' : user
            });
        })
    })

router
    .route('/user/create/:deparId')
    .get((rep, res) => {
        res.render('user/create',{
            'userDepaId' : rep.params.deparId, 
        })
    })

    .post((rep,res) => {
        User.create(rep.body).then(user => {
            let useDepId = rep.params.deparId
            res.redirect('/users/departement'+'/'+useDepId)
        })
    })

router
    .route('/user/edit/:id')
    .get((rep, res) => {
        User.findOne({
            where: { id: rep.params.deparId }
        }).then(user => {
           res.render('user/edit',{
              user : user  
           })
        })
    })
    .post((rep, res) => {

        User.findOne({ where: { id: rep.params.deparId } })
            .then(function (user) {
                user.update({
                    username: rep.body.username,
                    email: rep.body.email,
                    password: res.body.password
                })
                .then(function (updatedUser) {
                    let useDepId = rep.params.deparId
                    res.redirect('/users/departement'+'/'+useDepId) 
                })
            })

            .catch((e) => console.log(e.message))
    })




module.exports = router
