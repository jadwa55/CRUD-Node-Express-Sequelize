/*                              departement Route                           */
/* -------------------------------------------------------------------------- */

const express = require('express')
const router = express.Router()
const { Departement } = require('../models')

router
    .route('/departement')
    .get((rep, res) => {
        Departement.findAll().then(dep => {
            res.json(dep)
        })
    })
    .post((rep, res) => {
        Departement.create(rep.body).then(dep => {
            res.json(dep)
        })
            .catch((e) => console.log(e.message))
    })

router
    .route('/departement/:id')
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

router
    .route('/departement/:id/active')
    .get((rep, res) => {
        Departement.findOne({ where: { id: rep.params.id } })
        .then(function (project) {
            project.update({
                status: 1
            })
            .then(function (project) {
                res.json(project)
            })
        })
        .catch((e) => console.log(e.message))
    })

router
    .route('/departement/:id/disactive')
    .get((rep, res) => {
        Departement.findOne({ where: { id: rep.params.id } })
        .then(function (project) {
            project.update({
                status: 0
            })
            .then(function (project) {
                res.json(project)
            })
        })
        .catch((e) => console.log(e.message))
    })

module.exports = router