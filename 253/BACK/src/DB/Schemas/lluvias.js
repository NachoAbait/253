const { Schema } = require("mongoose");

const lluviaSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  rainfall: {
    type: Number,
    required: true,
  },
});

module.exports = lluviaSchema;
