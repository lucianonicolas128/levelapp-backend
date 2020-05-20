'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EgresoSchema = Schema({
	fecha: String,
	proveedor: String,
	pedido: String,
	descripcion: String,
	monto: Number,
});

module.exports = mongoose.model('Venta', EgresoSchema);
