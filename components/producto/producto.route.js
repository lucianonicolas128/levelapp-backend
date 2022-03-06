'use strict'

var express = require('express');
var ProductoController = require('./producto.controller');
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

routerProducto.post('/producto/new', ProductoController.saveProducto);
routerProducto.get('/producto/get/:id?', ProductoController.getProducto);
routerProducto.get('/producto/search', ProductoController.getProductos);
routerProducto.put('/producto/update/:id', ProductoController.updateProducto);
routerProducto.delete('/producto/delete/:id', ProductoController.deleteProducto);
routerProducto.post('/upload-image-album/:id', mul_upload.single('image'), ProductoController.uploadImage);
/* routerProducto.post('/upload-image/:id', ProductoController.uploadImage); */
routerProducto.get('/get-image/:image', ProductoController.getImageFile);
routerProducto.get('/producto/search/:company', ProductoController.getProductosCompany);


module.exports = routerProducto;

    