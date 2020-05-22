'use strict'

var express = require('express');
var EgresoController = require('../controllers/egreso');
var routerEgreso = express.Router();
var crypto = require('crypto')
var multer = require('multer');

router.post('/save-egreso', EgresoController.saveegreso);
router.get('/egreso/:id?', EgresoController.getegreso);
router.get('/egresos', EgresoController.getegresos);
router.put('/egreso/:id', EgresoController.updateegreso);
router.delete('/egreso/:id', EgresoController.deleteegreso);

module.exports = router;