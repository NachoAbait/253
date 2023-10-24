const { Schema } = require("mongoose");

const tropaSchema = new Schema({
  numero: { type: Number, required: true },
  productor: String,
  cabezas: { type: Number, required: true },
  kg_totales: { type: Number, required: true, min: 0 },
  consignatario: String,
  fecha_ingreso: { type: Date, required: true },
  faena: { type: String, enum: ["Parcial", "Total"], required: true },
  precio_compra: { type: Number, min: 0 },
  precio_venta: { type: Number, min: 0 },
  precio_faena: { type: Number, min: 0 },
  diferencia: Number, // Considera calcularlo en la aplicación si es posible.
});

module.exports = tropaSchema;
