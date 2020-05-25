'use strict'

var Cliente = require('../models/cliente');
var fs = require('fs');
var path = require('path');

var controller = {
    saveCliente: function(req, res){
        var cliente = new Cliente();
        var params = req.body;

        cliente.nombre = params.nombre;
        cliente.telefono = params.telefono;
        cliente.direccion = params.direccion;

        cliente.save((err, clienteStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el cliente.'})
            if(!clienteStored) return res.status(404).send({message: 'No se ha podido guardar el cliente.'})
            return res.status(200).send({cliente: clienteStored});
        });
    },

    getCliente: function(req, res){
        var clienteId = req.params.id;
        if(clienteId == null) return res.status(404).send({message: 'El cliente no existe.'});

        Cliente.findById(clienteId, (err, cliente) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!cliente) return res.status(404).send({message: 'El cliente no existe'});

            return res.status(200).send({
                cliente
            });
        })
    },

    getClientes: function(req, res){
        Cliente.find({}).sort('-nombre').exec((err, clientes) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!clientes) return res.status(404).send({message: 'No hay clientes para mostrar'});
            
            return res.status(200).send({clientes});
        })
    },

    
    updateCliente: function(req, res){
        var clienteId = req.params.id;
        var update = req.body;

        Cliente.findByIdAndUpdate(clienteId, update, {new:true}, (err, clienteUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!clienteUpdated) return res.status(404).send({message: 'No existe el cliente ha actualizar'});
            return res.status(200).send({
                cliente: clienteUpdated
            })
        });
    },

    deleteCliente: function(req, res){
        var clienteId = req.params.id;
        
        Cliente.findByIdAndRemove(clienteId, (err, clienteRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar el cliente'});
            
            if(!clienteRemoved) return res.status(404).send({message: 'No se puede eliminar el cliente'});

            return res.status(200).send({
                cliente: clienteRemoved
            });
        });
    }

}


module.exports = controller;
