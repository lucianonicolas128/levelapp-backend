'use strict'

var Material = require('./material.model');
var gs = require('fs');
var path = require('path');

var controller = {
    saveMaterial: function(req,res){
        var material = new Material();
        var params = req.body;

        material.name = params.name;
        material.price = params.price;
        material.category = params.category;

        material.save((err, materialStored) => {
            if(err) return res.status(500).sent({message: 'Error al guardar el material'});
            if(!materialStored) return res.status(404).send({message: 'No se ha podido guardar el material'});
            return res.status(200).send({material: materialStored});
        });
    },

    getMaterial: function(req,res){
        var materialId = req.params.id;
        if(materialId == null) return res.status(404).send({message: 'El material no existe.'});

        Material.findById(materialId, (err, material) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!material) return res.status(404).send({message: 'El material no existe'});
            return res.status(200).send({
                material
            });
        })
    },

    getMateriales: function(req,res){
        Material.find({}).sort('-nombre').exec((err, materiales) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!materiales) return res.status(404).send({message: 'No hay materiales para mostrar'});
            return res.status(200).send({materiales});
        })
    },

    
    updateMaterial: function(req, res){
        var materialId = req.params.id;
        var update = req.body;

        Material.findByIdAndUpdate(materialId, update, {new:true}, (err, materialUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!materialUpdated) return res.status(404).send({message: 'No existe el material ha actualizar'});
            return res.status(200).send({
                material: materialUpdated
            })
        });
    },
    
    deleteMaterial: function(req, res){
        var materialId = req.params.id;
        
        Material.findByIdAndRemove(materialId, (err, materialRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar el material'});
            
            if(!materialRemoved) return res.status(404).send({message: 'No se puede eliminar ese material'});

            return res.status(200).send({
                material: materialRemoved
            });
        });
    },

    
}

module.exports = controller;