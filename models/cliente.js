'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombre: String,
    telefono: Number,
    direccion: String

});

module.exports = mongoose.model('Cliente', ClienteSchema);
