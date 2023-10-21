const { Schema } = require("mongoose");

const distribuidorSchema = new Schema({
  nombre: String,
});

module.exports = distribuidorSchema;
