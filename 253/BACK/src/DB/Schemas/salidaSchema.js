const { Schema } = require("mongoose");

const salidaSchema = new Schema({
  fecha: Date,
  distribuidor: { type: Schema.Types.ObjectId, ref: "Distribuidores" },
  animales: [{ type: Schema.Types.ObjectId, ref: "mediares", required: true }],
});

module.exports = salidaSchema;
