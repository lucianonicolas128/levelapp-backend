'use strict'

var express = require('express');
var CategoriaController = require('./categoria.controller');
var routerCategoria = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerCategoria.post('/categoria/new', CategoriaController.saveCategoria);
routerCategoria.get('/categoria/get/:id?', CategoriaController.getCategoria);
routerCategoria.get('/categoria/search', CategoriaController.getCategorias);
routerCategoria.put('/categoria/update/:id', CategoriaController.updateCategoria);
routerCategoria.delete('/categoria/delete/:id', CategoriaController.deleteCategoria);
routerCategoria.get('/categoria/search/:company', CategoriaController.getCategoriasCompany);

module.exports = routerCategoria;