const mediaRes = require("./routes/mediaRes");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { requiredPaths } = require("./DB/Schemas/distribuidorSchema");
const cors = require("cors");

// SERVIDOR
const server = express();
async function main() {
  await server.listen(3001);
  console.log("Server running on port 3001");
}

//MIDDLEWARES
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

//RUTAS
server.use("/", mediaRes);

main();

require("./DB/index");
