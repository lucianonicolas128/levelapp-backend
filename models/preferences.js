'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PreferencesSchema = Schema({
	company: String,
	nameCommerce: String,
	descriptionCommerce: String,
	imageLogo: String,
	phoneContact: String,
	emailContact: String,
	ubicationContact: String,
	facebook: String,
	instagram: String,
	twitter: String,
	linkedin: String,
	firstColor: String,
	secondColor: String,
	imageBanner: String,
})

module.exports = mongoose.model('Preferences', PreferencesSchema);