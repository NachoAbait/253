const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const conn = mongoose.createConnection(MONGO_URI);

module.exports = {
  Distribuidor: conn.model(
    "Distribuidores",
    require("./Schemas/distribuidorSchema")
  ),
  MediaRes: conn.model("mediares", require("./Schemas/resSchema")),
  Tropa: conn.model("tropas", require("./Schemas/tropaSchema")),
};
