'use strict'

const express = require('express');
const http = require('http');
const path = require('path');

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
const url = 'mongodb+srv://lucianonicolas:nosleep.14@levelapp-2flgr.gcp.mongodb.net/test?retryWrites=true&w=majority';
// const url = 'mongodb://localhost:27017/levelapp';

mongoose.Promise = global.Promise;
mongoose.connect(url ,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");

        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
        	});

        })
		.catch(err => console.log(err));

	


app.set('port', process.env.PORT);
		
app.listen(app.get('port'), () =>{
	console.log(`server on port ${app.get('port')}`)
})
