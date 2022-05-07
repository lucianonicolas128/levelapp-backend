"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EgresoSchema = Schema({
  company: String,
  nombre: String,
  apellido: String,
  email: String,
  descripcion: String,
  cargo: String,
  usuario: String,
});

module.exports = mongoose.model("Entidades", EgresoSchema);
