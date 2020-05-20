'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos rutas
var ventas_routes = require('./routes/venta');
var productos_routes = require('./routes/producto');
var egresos_routes = require('./routes/egreso');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras (headers)
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use('/api', ventas_routes);
app.use('/api', productos_routes);
app.use('/api', egresos_routes);

// Exportar
module.exports = app;