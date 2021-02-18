'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
	company: String,
    nombre: String,
    telefono: Number,
    direccion: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);
