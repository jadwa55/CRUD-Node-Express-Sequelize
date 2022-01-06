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

    // Departement.create(rep.body).then(dep => {
    //     res.render('depar/create')
    // })

router
    .route('/departement/edit/:id')
    .get((rep, res) => {
        Departement.findAll({
            where: { id: rep.params.id }
        }).then(dep => {
            res.json(dep)
        })
    })
    .post((rep, res) => {

        Departement.findOne({ where: { id: rep.params.id } })
            .then(function (project) {
                project.update({
                    name: rep.body.name
                })
                .then(function (project) {
                    res.json(project)
                })
            })
            .catch((e) => console.log(e.message))
    })



module.exports = router