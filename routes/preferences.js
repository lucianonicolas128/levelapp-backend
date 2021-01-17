'use strict'

var express = require('express');
var PreferencesController = require('../controllers/preferences');
var routerPreferences = express.Router();

// Variables para la subida de archivos
var crypto = require('crypto');
var multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, './uploads/preferences');
    },

    filename(req, file = {}, cb){
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        crypto. pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });
    },
});

var mul_upload = multer({dest: './uploads/preferences', storage});

routerPreferences.post('/save-preferences', PreferencesController.savePreferences);
routerPreferences.get('/preferences/:id', PreferencesController.getPreferences);
routerPreferences.put('/preferences/:id', PreferencesController.updatePreferences);
routerPreferences.get('/preferences', PreferencesController.getPreferenceses);
routerPreferences.post('/upload-image-preferences-logo/:id', mul_upload.single('image'), PreferencesController.uploadImageLogo);
routerPreferences.get('/get-image-preferences-logo/:image', PreferencesController.getImageFileLogo);
routerPreferences.post('/upload-image-preferences-banner/:id', mul_upload.single('image'), PreferencesController.uploadImageBanner);
routerPreferences.get('/get-image-preferences-banner/:image', PreferencesController.getImageFileBanner);

module.exports = routerPreferences;