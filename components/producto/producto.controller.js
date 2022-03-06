'use strict'

var Product = require('./producto.model');
var fs = require('fs');
var path = require('path');

var controller = {

    saveProducto: function (req, res) {
        // console.log(req.body)
        var product = new Product();
        var params = req.body;        
        product.nombre = params?.nombre;
        product.descripcion = params?.descripcion;
        product.categoria = params?.categoria;
        product.costo = params?.costo;
        product.costo_sugerido = params?.costo_sugerido;
        product.costo_usd = params?.costo_usd;
        product.precio = params?.precio;
        product.precio_sugerido = params?.precio_sugerido;
        product.precio_usd = params?.precio_usd;
        product.tienda = params?.tienda;
        product.personalizable = params?.personalizable;
        product.tiempo_elaboracion = params?.tiempo_elaboracion;
        product.image = null;
        product.details = null;
        product.company = params?.company;
        console.log(product)
        product.save((err, productStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el product.' })
            if (!productStored) return res.status(404).send({ message: 'No se ha podido guardar el product.' })
            return res.status(200).send({ product: productStored });
        });
    },

    getProducto: function (req, res) {
        var productId = req.params.id;
        if (productId == null) return res.status(404).send({ message: 'El product no existe.' });
        Product.findById(productId, (err, product) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!product) return res.status(404).send({ message: 'El product no existe' });
            return res.status(200).send({ product });
        }).populate("categoria")
    },

    getProductos: function (req, res) {
        Product.find({}).populate("categoria").sort('-categoria').exec((err, products) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!products) return res.status(404).send({ message: 'No hay products para mostrar' });
            return res.status(200).send({ products });
        })
    },

    getProductosCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No se encuentra la Organizacion' });
        Product.find({ 'company': company}).populate("categoria").sort('-categoria').exec((err, products) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!products) return res.status(404).send({ message: 'No hay products para mostrar' });
            // let productsFiltrados = products.filter(product => product.company === company);
            let productsFiltrados = products;
            return res.status(200).send( productsFiltrados );
        })
    },

    updateProducto: function (req, res) {
        var productId = req.params.id;
        var update = req.body;
        Product.findByIdAndUpdate(productId, update, { new: true }, (err, productUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!productUpdated) return res.status(404).send({ message: 'No existe el product ha actualizar' });
            return res.status(200).send({ product: productUpdated })
        });
    },

    deleteProducto: function (req, res) {
        var productId = req.params.id;

        Product.findByIdAndRemove(productId, (err, productRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el product' });
            if (!productRemoved) return res.status(404).send({ message: 'No se puede eliminar ese product' });
            return res.status(200).send({ product: productRemoved });
        });
    },

    uploadImage: function (req, res) {
        var productoId = req.params.id;
        var fileName = 'Imagen no subida...';
        if (req.file) {
            var file_path = req.file.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1];
            if (file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg') {
                Producto.findByIdAndUpdate(productoId, { image: file_name }, (err, productoUpdated) => {
                    if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });
                    if (!productoUpdated) {
                        res.status(404).send({ message: 'No se ha podido actualizar el album' });
                    } else {
                        res.status(200).send({ producto: productoUpdated });
                    }
                });
            } else {
                fs.unlink(file_path, (err) => {
                    return res.status(200).send({ message: 'La extension no es valida' });
                });
            }
        } else {
            res.status(200).send({ message: 'No has subido ninguna imagen..' });
        }
    },

    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/productos/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen...'
                })
            }
        })
    }
}

module.exports = controller;