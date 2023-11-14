const { Schema } = require("mongoose");

const lluviaSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  milimetros: {
    type: Number,
    required: true,
  },
});

module.exports = lluviaSchema;
