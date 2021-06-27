'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
    company: String,
    icon: String,
    name: String,
});

module.exports = mongoose.model('Category', CategorySchema);