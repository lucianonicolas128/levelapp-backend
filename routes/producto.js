'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');
var routerProducto = express.Router();
var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({

/* SOLUCIONA PROBLEMA DEL MULTIPARTY sadasdasd */

destination(req, file, cb) {
    cb(null, './uploads/productos');
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
var mul_upload = multer({dest: './uploads/productos',storage});

routerProducto.post('/save-producto', ProductoController.saveProducto);
routerProducto.get('/producto/:id?', ProductoController.getProducto);
routerProducto.get('/productos', ProductoController.getProductos);
routerProducto.put('/producto/:id', ProductoController.updateProducto);
routerProducto.delete('/producto/:id', ProductoController.deleteProducto);
routerProducto.post('/upload-image-album/:id', mul_upload.single('image'), ProductoController.uploadImage);
/* routerProducto.post('/upload-image/:id', ProductoController.uploadImage); */
routerProducto.get('/get-image/:image', ProductoController.getImageFile);
routerProducto.get('/productos/:company', ProductoController.getProductosCompany);


module.exports = routerProducto;

    