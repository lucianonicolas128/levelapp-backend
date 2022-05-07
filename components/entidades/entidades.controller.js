'use strict'

var Entidades = require('./entidades.model');
var fs = require('fs');
var path = require('path');

var controller = {
    saveEntidades: function (req, res) {
        var entidades = new Entidades();
        var params = req.body;
        entidades.nombre = params.nombre;
        entidades.apellido = params.apellido;
        entidades.email = params.email;
        entidades.descripcion = params.descripcion;
        entidades.cargo  = params.cargo;
        entidades.usuario = params.usuario;
        entidades.save((err, entidadesStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el entidades.' })
            if (!entidadesStored) return res.status(404).send({ message: 'No se ha podido guardar el entidades.' })
            return res.status(200).send({ entidades: entidadesStored });
        });
    },

    getEntidades: function (req, res) {
        var entidadesId = req.params.id;
        if (entidadesId == null) return res.status(404).send({ message: 'El entidades no existe.' });
        Entidades.findById(entidadesId, (err, entidades) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!entidades) return res.status(404).send({ message: 'El entidades no existe' });
            return res.status(200).send({ entidades });
        }).populate({path: 'Entidades'})
    },

    getEntidadess: function (req, res) {
        Entidades.find({}).sort('-fecha').populate({path: 'Entidades'}).exec((err, entidadess) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!entidadess) return res.status(404).send({ message: 'No hay entidadess para mostrar' });
            return res.status(200).send({ entidadess });
        })
    },

    getEntidadessCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No hay entidadess para mostrar' });
        Entidades.find({}).sort('-fecha').populate({path: 'Entidades'}).exec((err, entidadess) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!entidadess) return res.status(404).send({ message: 'No hay entidadess para mostrar' });
            let entidadessFiltrados = entidadess.filter(entidades => entidades.company === company);
            return res.status(200).send({ entidadessFiltrados });
        })
    },

    updateEntidades: function (req, res) {
        var entidadesId = req.params.id;
        var update = req.body;
        Entidades.findByIdAndUpdate(entidadesId, update, { new: true }, (err, entidadesUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!entidadesUpdated) return res.status(404).send({ message: 'No existe el entidades ha actualizar' });
            return res.status(200).send({ entidades: entidadesUpdated })
        });
    },

    deleteEntidades: function (req, res) {
        var entidadesId = req.params.id;
        Entidades.findByIdAndRemove(entidadesId, (err, entidadesRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el entidades' });
            if (!entidadesRemoved) return res.status(404).send({ message: 'No se puede eliminar el entidades' });
            return res.status(200).send({ entidades: entidadesRemoved });
        });
    }
}


module.exports = controller;
