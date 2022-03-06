'use strict'

var Categoria = require('./categoria.model');
var fs = require('fs');
var path = require('path');

var controller = {

    saveCategoria: function (req, res) {
        var categoria = new Categoria();
        var params = req.body;
        categoria.nombre = params.nombre;
        categoria.descripcion = params.descripcion;
        categoria.referencia = params.referencia;
        categoria.tienda = params.tienda;
        categoria.company = params.company;
        categoria.save((err, categoriaStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el categoria.' })
            if (!categoriaStored) return res.status(404).send({ message: 'No se ha podido guardar el categoria.' })
            return res.status(200).send({ categoria: categoriaStored });
        });
    },

    getCategoria: function (req, res) {
        var categoriaId = req.params.id;
        if (categoriaId == null) return res.status(404).send({ message: 'El categoria no existe.' });
        categoria.findById(categoriaId, (err, categoria) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!categoria) return res.status(404).send({ message: 'El categoria no existe' });
            return res.status(200).send({ categoria });
        })
    },

    getCategorias: function (req, res) {
        Categoria.find({}).sort('-categoria').exec((err, categoria) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!categoria) return res.status(404).send({ message: 'No hay categoria para mostrar' });
            return res.status(200).send({ categoria });
        })
    },

    getCategoriasCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No se encuentra la Organizacion' });
        Categoria.find({}).sort('-categoria').exec((err, categorias) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!categorias) return res.status(404).send({ message: 'No hay categorias para mostrar' });
            let categoriasFiltrados = categorias.filter(categoria => categoria.company === company);
            return res.status(200).send({ categoriasFiltrados });
        })
    },

    updateCategoria: function (req, res) {
        var categoriaId = req.params.id;
        var update = req.body;
        Categoria.findByIdAndUpdate(categoriaId, update, { new: true }, (err, categoriaUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!categoriaUpdated) return res.status(404).send({ message: 'No existe el categoria ha actualizar' });
            return res.status(200).send({ categoria: categoriaUpdated })
        });
    },

    deleteCategoria: function (req, res) {
        var categoriaId = req.params.id;

        Categoria.findByIdAndRemove(categoriaId, (err, categoriaRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el categoria' });
            if (!categoriaRemoved) return res.status(404).send({ message: 'No se puede eliminar ese categoria' });
            return res.status(200).send({ categoria: categoriaRemoved });
        });
    },
}

module.exports = controller;