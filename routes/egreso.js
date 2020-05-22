'use strict'

var express = require('express');
var EgresoController = require('../controllers/egreso');
var routerEgreso = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerEgreso.post('/save-egreso', EgresoController.saveEgreso);
routerEgreso.get('/egreso/:id?', EgresoController.getEgreso);
routerEgreso.get('/egresos', EgresoController.getEgresos);
routerEgreso.put('/egreso/:id', EgresoController.updateEgreso);
routerEgreso.delete('/egreso/:id', EgresoController.deleteEgreso);

module.exports = routerEgreso;