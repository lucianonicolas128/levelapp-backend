'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({
    nombre: String,
    referencia: String,
    descripcion: String,
    tienda: Boolean,
	company: String,
    
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
