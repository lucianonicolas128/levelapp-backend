'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    nombre: String,
    descripcion: String,
    categoria: String,
    costo: Number,
    precio: Number,
    imagen: String
});

module.exports = mongoose.model('Producto', ProductoSchema);