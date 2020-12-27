'use strict'

var express = require('express');
var MaterialController = require('../controllers/material');
var routerMaterial = express.Router();
var crypto = require('crypto')
var multer = require('multer');


routerMaterial.post('/save-material', MaterialController.saveMaterial);
routerMaterial.get('/material/:id?', MaterialController.getMaterial);
routerMaterial.get('/materials', MaterialController.getMateriales);
routerMaterial.put('/material/:id', MaterialController.updateMaterial);
routerMaterial.delete('/material/:id', MaterialController.deleteMaterial);

module.exports = routerMaterial;