const { Schema } = require("mongoose");

const usuarioSchema = new Schema({
  usuario: String,
  contraseña: String,
  isAdmin: Boolean,
});

module.exports = usuarioSchema;
