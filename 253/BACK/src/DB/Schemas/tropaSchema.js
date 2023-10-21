const { Schema } = require("mongoose");

const tropaSchema = new Schema({
  numero: Number,
  tipo_Compra: { type: String, enum: ["Pie", "Gancho"] },
  productor: String,
  cabezas: Number,
  fecha_faena: Date,
  kg_totales: Number,
  precio_compra: Number,
  precio_faena: Number,

  precio_venta: Number,
});

module.exports = tropaSchema;
