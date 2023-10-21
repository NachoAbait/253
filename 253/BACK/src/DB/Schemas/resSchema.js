const { Schema } = require("mongoose");

const mediaResSchema = new Schema({
  tipo: { type: String, enum: ["NO", "NTO", "VC", "VQ"] },
  peso: Number,
  distribuidor: { type: Schema.Types.ObjectId, ref: "Distribuidores" },
  estado: { type: String, enum: ["camara", "despachada"], default: "camara" },
  observaciones: String,
  tropa: { type: Schema.Types.ObjectId, ref: "tropas" },
});

module.exports = mediaResSchema;
