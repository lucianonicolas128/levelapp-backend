'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialSchema = Schema({
    name: String,
    price: Number,
    category: String,
	company: String,

});

module.exports = mongoose.model('Material', MaterialSchema);