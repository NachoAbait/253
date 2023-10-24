const express = require("express");
const router = express.Router();
const {
  getStock,
  postMediaRes,
  deleteMediaRes,
  deleteTropa,
  postTropa,
  getDistribuidores,
  getTropa
} = require("../controllers/index.js");

////// MEDIA RES ///////////
router.get("/stock", getStock);

router.post("/res", postMediaRes);

router.delete("/res", deleteMediaRes);

/////// TROPA ////////////////
router.post("/tropa", postTropa);

router.delete("/tropa", deleteTropa);

router.get("/tropa", getTropa);


////////// DISTRIBUIDORES  ///////////////
router.get("/distribuidor", getDistribuidores);

module.exports = router;
