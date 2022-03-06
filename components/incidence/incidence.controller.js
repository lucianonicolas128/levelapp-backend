'use strict'

var Incidence = require('./incidence.model');
var fs = require('fs');
var path = require('path');

var controller = {
    saveIncidence: function (req, res) {
        var incidence = new Incidence();
        var params = req.body;
        incidence.fecha = params.fecha;
        incidence.cliente = params.cliente;
        incidence.cliente_uid = params.cliente_uid;
        incidence.company = params.company;
        incidence.descripcion = params.descripcion;
        incidence.entregado = params.entregado;
        incidence.pedido = params.pedido;
        incidence.monto = params.monto;
        incidence.saldo = params.saldo;
        incidence.proveedor = params.proveedor;
        incidence.proveedor_uid = params.proveedor_uid;
        incidence.type = params.type;
        incidence.details = params.details;

        incidence.save((err, incidenceStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el incidence.' })
            if (!incidenceStored) return res.status(404).send({ message: 'No se ha podido guardar el incidence.' })
            return res.status(200).send({ incidence: incidenceStored });
        });
    },

    getIncidence: function (req, res) {
        var incidenceId = req.params.id;
        if (incidenceId == null) return res.status(404).send({ message: 'El incidence no existe.' });
        Incidence.findById(incidenceId, (err, incidence) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!incidence) return res.status(404).send({ message: 'El incidence no existe' });
            return res.status(200).send({ incidence });
        })
    },

    getIncidences: function (req, res) {
        Incidence.find({}).sort('-fecha').exec((err, incidences) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!incidences) return res.status(404).send({ message: 'No hay incidences para mostrar' });
            return res.status(200).send({ incidences });
        })
    },

    getIncidencesCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No hay incidences para mostrar' });
        Incidence.find({}).sort('-fecha').exec((err, incidences) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!incidences) return res.status(404).send({ message: 'No hay incidences para mostrar' });
            let incidencesFiltrados = incidences.filter(incidence => incidence.company === company);
            return res.status(200).send({ incidencesFiltrados });
        })
    },

    updateIncidence: function (req, res) {
        var incidenceId = req.params.id;
        var update = req.body;
        Incidence.findByIdAndUpdate(incidenceId, update, { new: true }, (err, incidenceUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!incidenceUpdated) return res.status(404).send({ message: 'No existe el incidence ha actualizar' });
            return res.status(200).send({ incidence: incidenceUpdated })
        });
    },

    deleteIncidence: function (req, res) {
        var incidenceId = req.params.id;
        Incidence.findByIdAndRemove(incidenceId, (err, incidenceRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el incidence' });
            if (!incidenceRemoved) return res.status(404).send({ message: 'No se puede eliminar el incidence' });
            return res.status(200).send({ incidence: incidenceRemoved });
        });
    }
}


module.exports = controller;
