'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    company: String,
    nombre: String,
    descripcion: String,
    categoria: { type: mongoose.SchemaTypes.ObjectId, ref: "Categoria" },
    costo: Number,
    costo_sugerido: Number,
    costo_usd: Number,
    precio: Number,
    precio_sugerido: Number,
    precio_usd: Number,
    tienda: Boolean,
    image: String,
    personalizable: Boolean,
    tiempo_elaboracion: Number,
    details: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Detalles"
    },
});

module.exports = mongoose.model('Product', ProductoSchema);