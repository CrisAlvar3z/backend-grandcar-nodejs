const express = require('express');
const router = express.Router();
const arriendoService = require('./arriendos.service');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');

// routes

router.get('/', authorize(Role.Admin) ,getAll);
router.post('/savearriendo', authorize() ,saveArriendo);
router.get('/:id', getAllReservedDays);

//router.get('/:id', authorize(), getById);
function getAll(req, res, next) {
    arriendoService.getAllArriendos()
        .then(arriendos => res.json(arriendos))
        .catch(next);
}

function saveArriendo(req, res, next) {
    //console.log("origin"+req.get('origin'));
    arriendoService.saveArriendo(req.body)
        .then(() => res.json({ message: 'Reserva completada, revisa tu email para ver el detalle de la reserva.' }))
        .catch(next);
}

function getAllReservedDays(req, res, next) {
    arriendoService.getAllReservedDays(req.params.id)
        .then(daysOcupados => res.json(daysOcupados))
        .catch(next);
}

module.exports = router;