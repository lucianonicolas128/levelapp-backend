'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');
var routerCliente = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerCliente.post('/save-cliente', ClienteController.saveCliente);
routerCliente.get('/cliente/:id?', ClienteController.getCliente);
routerCliente.get('/clientes', ClienteController.getClientes);
routerCliente.put('/cliente/:id', ClienteController.updateCliente);
routerCliente.delete('/cliente/:id', ClienteController.deleteCliente);

module.exports = routerCliente;