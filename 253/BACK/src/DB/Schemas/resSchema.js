const { Schema } = require("mongoose");

const mediaResSchema = new Schema({
  categoria: { type: String, enum: ["NO", "NTO", "VC", "VQ"], required: true },
  peso: { type: Number, required: true },
  distribuidor: { type: Schema.Types.ObjectId, ref: "Distribuidores" },
  estado: { type: String, enum: ["camara", "despachada"], default: "camara" },
  observaciones: String,
  tropa: { type: Schema.Types.ObjectId, ref: "tropas", required: true },
});

module.exports = mediaResSchema;
