'use strict'

var Category = require('../models/category');
var fs = require('fs');
var path = require('path');

var controller = {

    saveCategory: function (req, res) {
        var category = new Category();
        var params = req.body;
        category.nombre = params.nombre;
        category.icon = params.icon;
        category.company = params.company;
        category.save((err, categoryStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el category.' })
            if (!categoryStored) return res.status(404).send({ message: 'No se ha podido guardar el category.' })
            return res.status(200).send({ category: categoryStored });
        });
    },

    getCategory: function (req, res) {
        var categoryId = req.params.id;
        if (categoryId == null) return res.status(404).send({ message: 'El category no existe.' });
        category.findById(categoryId, (err, category) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });
            if (!category) return res.status(404).send({ message: 'El category no existe' });
            return res.status(200).send({ category });
        })
    },

    getCategory: function (req, res) {
        Category.find({}).sort('-categoria').exec((err, categorys) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!categorys) return res.status(404).send({ message: 'No hay categorys para mostrar' });
            return res.status(200).send({ categorys });
        })
    },

    getCategoryCompany: function (req, res) {
        var company = req.params.company;
        if (company === null) return res.status(404).send({ message: 'No se encuentra la Organizacion' });
        Category.find({}).sort('-categoria').exec((err, categorys) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!categorys) return res.status(404).send({ message: 'No hay categorys para mostrar' });
            let categorysFiltrados = categorys.filter(category => category.company === company);
            return res.status(200).send({ categorysFiltrados });
        })
    },

    updateCategory: function (req, res) {
        var categoryId = req.params.id;
        var update = req.body;
        Category.findByIdAndUpdate(categoryId, update, { new: true }, (err, categoryUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar.' });
            if (!categoryUpdated) return res.status(404).send({ message: 'No existe el category ha actualizar' });
            return res.status(200).send({ category: categoryUpdated })
        });
    },

    deleteCategory: function (req, res) {
        var categoryId = req.params.id;

        Category.findByIdAndRemove(categoryId, (err, categoryRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido eliminar el category' });
            if (!categoryRemoved) return res.status(404).send({ message: 'No se puede eliminar ese category' });
            return res.status(200).send({ category: categoryRemoved });
        });
    },
}

module.exports = controller;