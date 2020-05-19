'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
	fecha: String,
	cliente: String,
	pedido: String,
	descripcion: String,
	monto: Number,
    saldo: Number,
    entregado: Boolean
});

module.exports = mongoose.model('Venta', VentaSchema);
