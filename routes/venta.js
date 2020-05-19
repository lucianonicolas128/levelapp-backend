'use strict'

var express = require('express');
var VentaController = require('../controllers/venta');
var router = express.Router();
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



router.get('/home', VentaController.home);
router.post('/test', VentaController.test);
router.post('/save-venta', VentaController.saveVenta);
router.get('/venta/:id?', VentaController.getVenta);
router.get('/ventas', VentaController.getVentas);
router.put('/venta/:id', VentaController.updateVenta);
router.delete('/venta/:id', VentaController.deleteVenta);

module.exports = router;