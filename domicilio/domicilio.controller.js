const express = require('express');
const router = express.Router();
const accountService = require('../accounts/account.service');
const authorize = require('_middleware/authorize')
const domicilioService = require('./domicilio.service');

router.get('/:id', authorize(), getById);

module.exports = router;

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    domicilioService.getByID(req.params.id)
        .then(direccion => direccion ? res.json(direccion) : res.sendStatus(404))
        .catch(next);
}
