'use strict'

var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

var controller = {
    
    saveProducto: function(req, res){
        var producto = new Producto();
        var params = req.body;

        producto.nombre = params.nombre;
        producto.descripcion = params.descripcion;
        producto.categoria = params.categoria;
        producto.costo = params.costo;
        producto.precio = params.precio;
        producto.imagen = null;

        producto.save((err, productoStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar el producto.'})
            if(!productoStored) return res.status(404).send({message: 'No se ha podido guardar el producto.'})
            return res.status(200).send({producto: productoStored});
        });
    },

    getProducto: function(req, res){
        var productoId = req.params.id;
        if(productoId == null) return res.status(404).send({message: 'El producto no existe.'});

        Producto.findById(productoId, (err, producto) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!producto) return res.status(404).send({message: 'El producto no existe'});

            return res.status(200).send({
                producto
            });
        })
    },

    getProductos: function(req, res){
        Producto.find({}).sort('-categoria').exec((err, productos) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!productos) return res.status(404).send({message: 'No hay productos para mostrar'});
            
            return res.status(200).send({productos});
        })
    },

    
    updateProducto: function(req, res){
        var productoId = req.params.id;
        var update = req.body;

        Producto.findByIdAndUpdate(productoId, update, {new:true}, (err, productoUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!productoUpdated) return res.status(404).send({message: 'No existe el producto ha actualizar'});
            return res.status(200).send({
                producto: productoUpdated
            })
        });
    },

    deleteProducto: function(req, res){
        var productoId = req.params.id;
        
        Producto.findByIdAndRemove(productoId, (err, productoRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido eliminar el producto'});
            
            if(!productoRemoved) return res.status(404).send({message: 'No se puede eliminar ese producto'});

            return res.status(200).send({
                producto: productoRemoved
            });
        });
    }

}


module.exports = controller;
