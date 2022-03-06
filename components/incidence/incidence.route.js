'use strict'

var express = require('express');
var IncidenceController = require('./incidence.controller');
var routerIncidence = express.Router();
var crypto = require('crypto')
var multer = require('multer');

routerIncidence.post('/incidence/new', IncidenceController.saveIncidence);
routerIncidence.get('/incidence/get/:id?', IncidenceController.getIncidence);
routerIncidence.get('/incidence/search', IncidenceController.getIncidences);
routerIncidence.put('/incidence/update/:id', IncidenceController.updateIncidence);
routerIncidence.delete('/incidence/delete/:id', IncidenceController.deleteIncidence);
routerIncidence.get('/incidence/search/:company', IncidenceController.getIncidencesCompany);

module.exports = routerIncidence;