'use strict'
/* 
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('./functions/node_modules/firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('./functions/node_modules/firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
	// Grab the text parameter.
	const original = req.query.text;
	// Push the new message into the Realtime Database using the Firebase Admin SDK.
	const snapshot = await admin.database().ref('/messages').push({original: original});
	// Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
	res.redirect(303, snapshot.ref.toString());
  }); */

const express = require('express');
/* const socketio = require('socket.io'); */
const http = require('http');
const path = require('path');

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

/* const server = http.createServer(app); */

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://lucianonicolas:nosleep.14@levelapp-2flgr.gcp.mongodb.net/test?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        	console.log("Conexión a la base de datos establecida satisfactoriamente...");

        	// Creacion del servidor
        	app.listen(port, () => {
        		console.log("Servidor corriendo correctamente en la url: localhost:3700");
        	});

        })
		.catch(err => console.log(err));


app.set('port', process.env.PORT);

/* 
server.listen(app.get('port'), () =>{
	console.log(`server on port ${app.get('port')}`)
}) */
		
app.listen(app.get('port'), () =>{
	console.log(`server on port ${app.get('port')}`)
})


/* 		
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    }); */