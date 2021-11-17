const express = require('express');
const router = express.Router();
const vehiculoService = require('./vehiculo.service');

// routes

router.get('/', getAll);


//router.get('/:id', authorize(), getById);
function getAll(req, res, next) {
    vehiculoService.getAllVehiculos()
        .then(vehiculos => res.json(vehiculos))
        .catch(next);
}

module.exports = router;