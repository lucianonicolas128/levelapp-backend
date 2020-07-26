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
        producto.image = null;

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
    },

    uploadImage: function(req, res){
        var productoId = req.params.id;
		var fileName = 'Imagen no subida...';
		if(req.file){
            var file_path = req.file.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1]
        
            if(file_ext== 'png' || file_ext== 'gif' || file_ext== 'jpg'){
              Producto.findByIdAndUpdate(productoId, {image:file_name}, (err, productoUpdated) => {
        
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!productoUpdated){        
                        res.status(404).send({message: 'No se ha podido actualizar el album'});
                    }else{
                        res.status(200).send({producto: productoUpdated});
                    }
                });
            }else{
                fs.unlink(file_path, (err) => {
                    return res.status(200).send({message: 'La extension no es valida'});
                });
            }        
          }else{
            res.status(200).send({message: 'No has subido ninguna imagen..'});
        }
    },

    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/productos/'+file;

        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: 'No existe la imagen...'
                })
            }
        })
    }
}

module.exports = controller;
