const mediaRes = require("./routes/mediaRes");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { requiredPaths } = require("./DB/Schemas/distribuidorSchema");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "https://253-nachoabait.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// SERVIDOR
const server = express();
async function main() {
  await server.listen(PORT);
  console.log(`Server running on port ${PORT}`);
}
server.use(cors(corsOptions));
//MIDDLEWARES
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use(express.json());


//RUTAS
server.use("/", mediaRes);

main();

require("./DB/index");
