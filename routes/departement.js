/*                              departement Route                           */
/* -------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const { Departement } = require('../models')

router
    .route('/departement')
    .get((rep, res) => {
        Departement.findAll().then(dep => { // les param lighdi i findi liya ghadi i t stockaw f 'dep'
            res.render('depar/home', {
                'departements' : dep
            });
        })
    })

router
    .route('/departement/create')
    .get((rep, res) => {
        res.render('depar/create')
    })

    .post((rep,res) => {
        Departement.create(rep.body).then(dep => {
            res.redirect('/departement')
        })
    })

router
    .route('/departement/edit/:id')
    .get((rep, res) => {
        Departement.findOne({
            where: { id: rep.params.id }
        }).then(dep => {
           res.render('depar/edit',{
              departement : dep  
           })
        })
    })
    .post((rep, res) => {

        Departement.findOne({ where: { id: rep.params.id } })
            .then(function (departement) {
                departement.update({
                    name: rep.body.name,
                    description: rep.body.description
                })
                .then(function (updatedDepartement) {
                    res.redirect('/departement') 
                })
            })
            .catch((e) => console.log(e.message))
    })



module.exports = router