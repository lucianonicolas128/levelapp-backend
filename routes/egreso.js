'use strict'

var express = require('express');
var EgresoController = require('../controllers/egreso');
var routerEgreso = express.Router();
var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({

    /* SOLUCIONA PROBLEMA DEL MULTIPARTY */
    
  destination(req, file, cb) {
    cb(null, './uploads/albums');
  },

  filename(req, file = {}, cb) {
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + fileExtension);
    });
  },
});
var mul_upload = multer({dest: './uploads/albums',storage});



router.get('/home', EgresoController.home);
router.post('/test', EgresoController.test);
router.post('/save-egreso', EgresoController.saveegreso);
router.get('/egreso/:id?', EgresoController.getegreso);
router.get('/egresos', EgresoController.getegresos);
router.put('/egreso/:id', EgresoController.updateegreso);
router.delete('/egreso/:id', EgresoController.deleteegreso);

module.exports = router;