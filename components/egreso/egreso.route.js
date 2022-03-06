'use strict'

var express = require('express');
var EgresoController = require('./egreso.controller');
var routerEgreso = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerEgreso.post('/egreso/new', EgresoController.saveEgreso);
routerEgreso.get('/egreso/get/:id?', EgresoController.getEgreso);
routerEgreso.get('/egreso/search', EgresoController.getEgresos);
routerEgreso.put('/egreso/update/:id', EgresoController.updateEgreso);
routerEgreso.delete('/egreso/delete/:id', EgresoController.deleteEgreso);
routerEgreso.get('/egreso/search/:company', EgresoController.getEgresosCompany);

module.exports = routerEgreso;