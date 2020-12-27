'use strict'

var Preferences = require('../models/preferences');
var fs = require('fs');
var path = require('path');

var controller = {
    savePreferences: function(req, res){
        var preferences = new Preferences();
        var params = req.body;

        preferences.nameCommerce = params.nameCommerce;
        preferences.descriptionCommerce = params.descriptionCommerce;
        preferences.imageLogo = params.imageLogo;
        preferences.phoneContact = params.phoneContact;
        preferences.emailContact = params.emailContact;
        preferences.ubicationContact = params.ubicationContact;
        preferences.facebook = params.facebook;
        preferences.instagram = params.instagram;
        preferences.twitter = params.twitter;
        preferences.linkedin = params.linkedin;
        preferences.firstColor = params.firstColor;
        preferences.secondColor = params.secondColor;
        preferences.imageBanner = params.imageBanner;
        

        preferences.save((err, preferencesStored) =>{
            if(err) return res.status(500).send({message: 'Error al guardar las preferencias.'})
            if(!preferencesStored) return res.status(404).send({message: 'No se han podido guardar las preferencias'})
            return res.status(200).send({preferences: preferencesStored});
        });
    },

    getPreferences: function(req, res){
        var preferencesId = req.params.id;
        if(preferencesId == null) return res.status(404).send({message: 'La preferencias no existe.'});

        Preferences.findById(preferencesId, (err, preferences) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if(!preferences) return res.status(404).send({message: 'Las preferencias no existe'});

            return res.status(200).send({preferences});
        })
    },
    
    updatePreferences: function(req, res){
        var preferencesId = req.params.id;
        var update = req.body;

        Preferences.findByIdAndUpdate(preferencesId, update, {new:true}, (err, preferencesUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar.'});
            if(!preferencesUpdated) return res.status(404).send({message: 'No existen las preferencias ha actualizar'});
            return res.status(200).send({
                preferences: preferencesUpdated
            })
        });
    },

    
    deletepreferences: function(req, res){
        var preferencesId = req.params.id;
        
        Preferences.findByIdAndRemove(preferencesId, (err, preferencesRemoved)=>{
            if(err) return res.status(500).send({message: 'No se han podido eliminar las preferencias'});
            
            if(!preferencesRemoved) return res.status(404).send({message: 'No se puede eliminar esa preferencias'});

            return res.status(200).send({
                preferences: preferencesRemoved
            });
        });
    },

    
    uploadImageLogo: function(req, res){
        var preferencesId = req.params.id;
		var fileName = 'Imagen no subida...';
		if(req.file){
            var file_path = req.file.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1]
        
            if(file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg'){
                Preferences.findByIdAndUpdate(preferencesId, {imageLogo: file_name}, {new: true}, (err, preferencesUpdated) => {
        
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!preferencesUpdated){        
                        res.status(404).send({message: 'No se ha podido actualizar el album'});
                    }else{
                        res.status(200).send({preferences: preferencesUpdated});
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
    uploadImageBanner: function(req, res){
        var preferencesId = req.params.id;
		var fileName = 'Imagen no subida...';
		if(req.file){
            var file_path = req.file.path;
            var file_split = file_path.split('\\');
            var file_name = file_split[2];
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1]
        
            if(file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg'){
                Preferences.findByIdAndUpdate(preferencesId, {imageBanner: file_name}, {new: true}, (err, preferencesUpdated) => {
        
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!preferencesUpdated){        
                        res.status(404).send({message: 'No se ha podido actualizar el album'});
                    }else{
                        res.status(200).send({preferences: preferencesUpdated});
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

    
    getImageFileLogo: function(req,res){
        var file = req.params.imageLogo;
        var path_file = './uploads/preferences/'+file;

        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }else{
                return res.status(200).send({
                    message: 'No existe la imagen...'
                })
            }
        })
    },
    
    getImageFileBanner: function(req,res){
        var file = req.params.imageBanner;
        var path_file = './uploads/preferences/'+file;

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