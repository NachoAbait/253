const { MediaRes, Tropa } = require("../DB/index.js");

const getStock = async (req, res) => {
  try {
    const stock = await MediaRes.find()
      .populate("tropa")
      .populate("distribuidor");
    res.status(200).json(stock);
  } catch (error) {
    console.error("Error al recuperar el stock:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const postMediaRes = async (req, res) => {
  try {
    const newMediaRes = new MediaRes(req.body);
    await newMediaRes.save();
    res.status(201).json(newMediaRes);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar media res", error });
  }
};

const deleteMediaRes = async (req, res) => {
  try {
    const mediaResId = req.params.id; // Asumiendo que el id se envía como parámetro en la URL
    await MediaRes.findByIdAndDelete(mediaResId);
    res.status(200).json({ message: "Media res eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar media res", error });
  }
};

/////// TROPA ////////////////
const postTropa = async (req, res) => {
  try {
    const newTropa = new Tropa(req.body);
    await newTropa.save();
    res.status(201).json(newTropa);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al agregar tropa", error: error.message });
  }
};
const deleteTropa = async (req, res) => {
  try {
    const tropaId = req.params.id; // Asumiendo que el id se envía como parámetro en la URL
    await Tropa.findByIdAndDelete(tropaId);
    res.status(200).json({ message: "Tropa eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar tropa", error });
  }
};

module.exports = {
  getStock,
  postMediaRes,
  deleteMediaRes,
  postTropa,
  deleteTropa,
};
