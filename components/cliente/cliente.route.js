'use strict'

var express = require('express');
var ClienteController = require('./cliente.controller');
var routerCliente = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerCliente.post('/cliente/new', ClienteController.saveCliente);
routerCliente.get('/cliente/get/:id?', ClienteController.getCliente);
routerCliente.get('/cliente/search', ClienteController.getClientes);
routerCliente.put('/cliente/update/:id', ClienteController.updateCliente);
routerCliente.delete('/cliente/delete/:id', ClienteController.deleteCliente);
routerCliente.get('/cliente/search/:company', ClienteController.getClientesCompany);

module.exports = routerCliente;