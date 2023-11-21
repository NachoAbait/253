const express = require("express");
const router = express.Router();
const {
  getStock,
  postMediaRes,
  deleteMediaRes,
  deleteTropa,
  postTropa,
  getDistribuidores,
  getTropa,
  putMediaRes,
  getDetalleTropa,
  getSalidas,
  getProductores,
  postProductores,
  putResSalida,
} = require("../controllers/index.js");

////// MEDIA RES ///////////
router.get("/stock", getStock);

router.post("/res", postMediaRes);

router.put("/res/:id", putMediaRes);

router.delete("/res/:id", deleteMediaRes);

/////// TROPA ////////////////
router.post("/tropa", postTropa);

router.delete("/tropa/:id", deleteTropa);

router.get("/tropa", getTropa);

router.get("/tropa/:id", getDetalleTropa);

////////// DISTRIBUIDORES  ///////////////
router.get("/distribuidor", getDistribuidores);

////////// SALIDAS  ///////////////
router.get("/salidas", getSalidas);

router.put("/salidas/:id", putResSalida);

///////// PRODUCTOR  /////////////
router.post("/productor", postProductores);
router.get("/productor", getProductores);

module.exports = router;
