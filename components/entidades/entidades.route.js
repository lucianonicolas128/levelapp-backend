'use strict'

var express = require('express');
var EntidadesController = require('./entidades.controller');
var routerEntidades = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerEntidades.post('/entidades/new', EntidadesController.saveEntidades);
routerEntidades.get('/entidades/get/:id?', EntidadesController.getEntidades);
routerEntidades.get('/entidades/search', EntidadesController.getEntidadess);
routerEntidades.put('/entidades/update/:id', EntidadesController.updateEntidades);
routerEntidades.delete('/entidades/delete/:id', EntidadesController.deleteEntidades);
routerEntidades.get('/entidades/search/:company', EntidadesController.getEntidadessCompany);

module.exports = routerEntidades;