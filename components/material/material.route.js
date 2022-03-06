'use strict'

var express = require('express');
var MaterialController = require('./material.controller');
var routerMaterial = express.Router();
var crypto = require('crypto')
var multer = require('multer');


routerMaterial.post('/material/new', MaterialController.saveMaterial);
routerMaterial.get('/material/get/:id?', MaterialController.getMaterial);
routerMaterial.get('/material/search', MaterialController.getMateriales);
routerMaterial.put('/material/update/:id', MaterialController.updateMaterial);
routerMaterial.delete('/material/delete/:id', MaterialController.deleteMaterial);
routerMaterial.get('/material/search/:company', MaterialController.getMateriales);

module.exports = routerMaterial;