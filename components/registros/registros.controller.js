'use strict'

var Registro = require('./registros.model');
var fs = require('fs');
var path = require('path');

var controller = {
    saveRegistro: function (req, res) {
        var registro = new Registro();
        var params = req.body;
        registro.fecha_inicio = params.fecha_inicio;
        registro.fecha_fin = params.fecha_fin;
        registro.entidad = params.entidad;
        registro.descripcion = params.descripcion;
        registro.tarea  = params.tarea;
        registro.categoria = params.categoria;
        registro.registros = params.registros;
        registro.save((err, registroStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el registro.' })
            if (!registroStored) return res.status(404).send({ message: 'No se ha podido guardar el registro.' })
            return res.status(200).send({ registro: registroStored });
        });
    },

    getRegistro: function (req, res) {
        var registroId = req.params.id;
        if (registroId == null) return res.status(404).send({ message: 'El registro no existe.' });
        Registro.findById(registroId, (err, registro) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!registro) return res.status(404).send({ message: 'El registro no existe' });
            return res.status(200).send({ registro });
        }).populate({path: 'Registro'})
    },

    getRegistros: function (req, res) {
        Registro.find({}).sort('-fecha').populate({path: 'Registro'}).exec((err, registros) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!registros) return res.status(404).send({ message: 'No hay registros para mostrar' });
            return res.status(200).send({ registros });
        })
    },

    getRegistrosCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No hay registros para mostrar' });
        Registro.find({}).sort('-fecha').populate({path: 'Registro'}).exec((err, registros) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!registros) return res.status(404).send({ message: 'No hay registros para mostrar' });
            let registrosFiltrados = registros.filter(registro => registro.company === company);
            return res.status(200).send({ registrosFiltrados });
        })
    },

    updateRegistro: function (req, res) {
        var registroId = req.params.id;
        var update = req.body;
        Registro.findByIdAndUpdate(registroId, update, { new: true }, (err, registroUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!registroUpdated) return res.status(404).send({ message: 'No existe el registro ha actualizar' });
            return res.status(200).send({ registro: registroUpdated })
        });
    },

    deleteRegistro: function (req, res) {
        var registroId = req.params.id;
        Registro.findByIdAndRemove(registroId, (err, registroRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el registro' });
            if (!registroRemoved) return res.status(404).send({ message: 'No se puede eliminar el registro' });
            return res.status(200).send({ registro: registroRemoved });
        });
    }
}


module.exports = controller;
