'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = Schema({
    uid: String,
    
});

module.exports = mongoose.model('Company', CompanySchema);
