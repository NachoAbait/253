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
} = require("../controllers/index.js");

////// MEDIA RES ///////////
router.get("/stock", getStock);

router.post("/res", postMediaRes);

router.put("/res/:id", putMediaRes);

router.delete("/res", deleteMediaRes);

/////// TROPA ////////////////
router.post("/tropa", postTropa);

router.delete("/tropa", deleteTropa);

router.get("/tropa", getTropa);

router.get("/tropa/:id", getDetalleTropa)

////////// DISTRIBUIDORES  ///////////////
router.get("/distribuidor", getDistribuidores);

module.exports = router;
