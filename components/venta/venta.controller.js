'use strict'

var Venta = require('./venta.model');
var fs = require('fs');
var path = require('path');
/* var Cliente = require('../models/cliente'); */

var controller = {

    saveVenta: function (req, res) {
        var venta = new Venta();
        var params = req.body;
        venta.fecha = params.fecha;
        venta.cliente = params.cliente;
        venta.pedido = params.pedido;
        venta.descripcion = params.descripcion;
        venta.monto = params.monto;
        venta.saldo = params.saldo;
        venta.entregado = params.entregado;
        venta.company = params.company;
        venta.save((err, ventaStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar la venta.' })
            if (!ventaStored) return res.status(404).send({ message: 'No se ha podido guardar la venta.' })
            return res.status(200).send({ venta: ventaStored });
        });
    },

    getVenta: function (req, res) {
        var ventaId = req.params.id;
        if (ventaId == null) return res.status(404).send({ message: 'La venta no existe.' });
        Venta.findById(ventaId, (err, venta) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!venta) return res.status(404).send({ message: 'La venta no existe' });
            return res.status(200).send({ venta });
        })
    },

    getVentas: function (req, res) {
        // Venta.find({$query: {ventas: req.ventas}, $orderby: {fecha: asc}}).exec((err, ventas) =>{
        Venta.find({}).sort({ fecha: -1 }).exec((err, ventas) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!ventas) return res.status(404).send({ message: 'No hay ventas para mostrar' });
            return res.status(200).send({ ventas });
        })
    },

    getVentasCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No se encuentra la Organizacion' });
        Venta.find({}).sort({ fecha: -1 }).exec((err, ventas) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!ventas) return res.status(404).send({ message: 'No hay ventas para mostrar' });
            let ventasFiltrados = ventas.filter(ventas => ventas.company === company);
            return res.status(200).send({ ventasFiltrados });
        })
    },

    updateVenta: function (req, res) {
        var ventaId = req.params.id;
        var update = req.body;
        Venta.findByIdAndUpdate(ventaId, update, { new: true }, (err, ventaUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!ventaUpdated) return res.status(404).send({ message: 'No existe la venta ha actualizar' });
            return res.status(200).send({ venta: ventaUpdated })
        });
    },

    deleteVenta: function (req, res) {
        var ventaId = req.params.id;
        Venta.findByIdAndRemove(ventaId, (err, ventaRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar la venta' });
            if (!ventaRemoved) return res.status(404).send({ message: 'No se puede eliminar esa venta' });
            return res.status(200).send({ venta: ventaRemoved });
        });
    }
}


module.exports = controller;
