'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = Schema({
    nombre: String,
    costo: Number

});

module.exports = mongoose.model('Material', MaterialSchema);