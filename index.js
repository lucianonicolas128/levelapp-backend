'use strict'

const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config.js');

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;
var port2 = 3001;
const url = `mongodb+srv://${config.USER}:${config.PASS}@${config.CLUSTER}/${config.BD}?retryWrites=true&w=majority`;
const url_backup = `mongodb+srv://${config.USER}:${config.PASS}@${config.CLUSTER}/${config.BD2}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("BD OK...");
		app.listen(process.env.PORT || 3000, () => { console.log(`Run in localhost:${port}`); });

	})
	.catch(err => console.log(err));

// mongoose.connect(url_backup, { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => {
// 		console.log("BD Backup OK...");
// 		app.listen(port2, () => { console.log(`Run in localhost:${port2}`); });

// 	})
// 	.catch(err => console.log(err));