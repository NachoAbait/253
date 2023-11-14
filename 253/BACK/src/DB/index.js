const mongoose = require("mongoose");
require("dotenv").config();

const DB_DEPLOY = process.env.DB_DEPLOY;
const MONGO_URI = process.env.MONGO_URI;

// const conn = mongoose.createConnection(MONGO_URI);

const conn = mongoose.createConnection(DB_DEPLOY);

module.exports = {
  Distribuidor: conn.model(
    "Distribuidores",
    require("./Schemas/distribuidorSchema")
  ),
  MediaRes: conn.model("mediares", require("./Schemas/resSchema")),
  Tropa: conn.model("tropas", require("./Schemas/tropaSchema")),
  Salida: conn.model("salidas", require("./Schemas/salidaSchema")),
  Productor: conn.model("productor", require("./Schemas/productorSchema")),
  Lluvia: conn.model("lluvias", require("./Schemas/lluvias")),
};
