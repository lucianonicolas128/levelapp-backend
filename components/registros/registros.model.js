"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EgresoSchema = Schema({
  company: String,
  fecha_inicio: String,
  fecha_fin: String,
  entidad: String,
  descripcion: String,
  tarea: String,
  categoria: String,
  registros: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Registro",
    },
  ],
});

module.exports = mongoose.model("Registro", EgresoSchema);
