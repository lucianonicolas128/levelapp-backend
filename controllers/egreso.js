'use strict'

var Egreso = require('../models/egreso');
var fs = require('fs');
var path = require('path');

var controller = {
    saveEgreso: function(req, res){
        var egreso = new Egreso();
        var params = req.body;

        egreso.fecha = params.fecha;
        egreso.proveedor = params.proveedor;
        egreso.pedido = params.pedido;
        egreso.descripcion = params.descripcion;
        egreso.monto = params.monto;

        egreso.save((err, egresoStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el egreso.'})
            if(!egresoStored) return res.status(404).send({message: 'No se ha podido guardar el egreso.'})
            return res.status(200).send({egreso: egresoStored});
        });
    },

    getEgreso: function(req, res){
        var egresoId = req.params.id;
        if(egresoId == null) return res.status(404).send({message: 'El egreso no existe.'});

        Egreso.findById(egresoId, (err, egreso) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!egreso) return res.status(404).send({message: 'El egreso no existe'});

            return res.status(200).send({
                egreso
            });
        })
    },

    getEgresos: function(req, res){
        Egreso.find({}).sort('-fecha').exec((err, egresos) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!egresos) return res.status(404).send({message: 'No hay egresos para mostrar'});
            
            return res.status(200).send({egresos});
        })
    },

    
    updateEgreso: function(req, res){
        var egresoId = req.params.id;
        var update = req.body;

        Egreso.findByIdAndUpdate(egresoId, update, {new:true}, (err, egresoUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!egresoUpdated) return res.status(404).send({message: 'No existe el egreso ha actualizar'});
            return res.status(200).send({
                egreso: egresoUpdated
            })
        });
    },

    deleteEgreso: function(req, res){
        var egresoId = req.params.id;
        
        Egreso.findByIdAndRemove(egresoId, (err, egresoRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar el egreso'});
            
            if(!egresoRemoved) return res.status(404).send({message: 'No se puede eliminar el egreso'});

            return res.status(200).send({
                egreso: egresoRemoved
            });
        });
    }

}


module.exports = controller;
