const { Schema } = require("mongoose");

const tropaSchema = new Schema({
  numero: { type: Number, required: true },
  productor: String,
  cabezas: { type: Number },
  kg_totales: { type: Number },
  consignatario: String,
  fecha_ingreso: { type: Date, required: true },
  faena: { type: String, enum: ["Parcial", "Total"]},
  precio_compra: { type: Number, min: 0 },
  precio_venta: { type: Number, min: 0 },
  precio_faena: { type: Number, min: 0 },
  diferencia: Number, // Considera calcularlo en la aplicación si es posible.
  animales: [{ type: Schema.Types.ObjectId, ref: "mediares", required: true }],
});

module.exports = tropaSchema;
