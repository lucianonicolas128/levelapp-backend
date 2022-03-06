'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IncidenceSchema = Schema({
    fecha: String,
    cliente: String,
    cliente_uid: { type: mongoose.SchemaTypes.ObjectId, ref: "Cliente" },
    company: String,
    descripcion: String,
    entregado: Boolean,
    pedido: String,
    monto: Number,
    proveedor: String,
    proveedor_uid: { type: mongoose.SchemaTypes.ObjectId, ref: "Proveedor" },
    saldo: Number,
    type: { type: String, enum: ["egreso", "venta"], default: "venta" },
    details: String
});

module.exports = mongoose.model('Incidence', IncidenceSchema);
