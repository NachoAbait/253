const { Schema } = require("mongoose");

const productorSchema = new Schema({
  nombre: String,
});

module.exports = productorSchema;
