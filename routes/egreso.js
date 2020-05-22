'use strict'

var express = require('express');
var EgresoController = require('../controllers/egreso');
var routerEgreso = express.Router();
var crypto = require('crypto')
var multer = require('multer');

router.post('/save-egreso', EgresoController.saveEgreso);
router.get('/egreso/:id?', EgresoController.getEgreso);
router.get('/egresos', EgresoController.getEgresos);
router.put('/egreso/:id', EgresoController.updateEgreso);
router.delete('/egreso/:id', EgresoController.deleteEgreso);

module.exports = routerEgreso;