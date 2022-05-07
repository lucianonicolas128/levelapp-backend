'use strict'

var express = require('express');
var RegistroController = require('./registros.controller');
var routerRegistro = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerRegistro.post('/registro/new', RegistroController.saveRegistro);
routerRegistro.get('/registro/get/:id?', RegistroController.getRegistro);
routerRegistro.get('/registro/search', RegistroController.getRegistros);
routerRegistro.put('/registro/update/:id', RegistroController.updateRegistro);
routerRegistro.delete('/registro/delete/:id', RegistroController.deleteRegistro);
routerRegistro.get('/registro/search/:company', RegistroController.getRegistrosCompany);

module.exports = routerRegistro;