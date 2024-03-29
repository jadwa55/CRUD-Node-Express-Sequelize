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
            where: { id: rep.params.id }
        }).then(user => {

            res.render('user/edit',{
              user : user  
           })
        })
    })
    .post((rep, res) => {

        User.findOne({ where: { id: rep.params.id} })
            .then(function (user) {
                user.update({
                    username: rep.body.username,
                    email: rep.body.email,
                    password: rep.body.password
                })
                .then(function (updatedUser) {
                    let useDepId = updatedUser.departementId
                    res.redirect('/users/departement'+'/'+useDepId) 
                })
            })

            .catch((e) => console.log(e.message))
    })

router
    .route('/user/delete/:id')
    .get((req, res) => {

        User.destroy({
            where: { id:req.params.id }
        
        })
        res.redirect('/departement')
});


module.exports = router
