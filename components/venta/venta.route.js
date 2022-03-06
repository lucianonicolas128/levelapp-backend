'use strict'

var express = require('express');
var VentaController = require('./venta.controller');
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
var mul_upload = multer({ dest: './uploads/albums', storage });

router.post('/venta/new', VentaController.saveVenta);
router.get('/venta/get/:id?', VentaController.getVenta);
router.get('/venta/search', VentaController.getVentas);
router.put('/venta/update/:id', VentaController.updateVenta);
router.delete('/venta/delete/:id', VentaController.deleteVenta);
router.get('/venta/search/:company', VentaController.getVentasCompany);

module.exports = router;