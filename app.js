'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Cargar archivos rutas
let ventas_routes = require('./components/venta/venta.route');
let productos_routes = require('./components/producto/producto.route');
let egresos_routes = require('./components/egreso/egreso.route');
let clientes_routes = require('./components/cliente/cliente.route');
let material_routes = require('./components/material/material.route');
let preferences_routes = require('./components/preferences/preferences.route')
let categorias_routes = require('./components/categoria/categoria.route');
let incidences_routes = require('./components/incidence/incidence.route');
let registros_routes = require('./components/registros/registros.route');
let entidades_routes = require('./components/entidades/entidades.route');


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
app.use('/api', clientes_routes);
app.use('/api', material_routes);
app.use('/api', preferences_routes);
app.use('/api', categorias_routes);
app.use('/api', incidences_routes);
app.use('/api', registros_routes);
app.use('/api', entidades_routes);

// Exportar
module.exports = app;