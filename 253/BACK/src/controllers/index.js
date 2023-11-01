const { MediaRes, Tropa, Distribuidor, Salida } = require("../DB/index.js");

const getStock = async (req, res) => {
  try {
    const stock = await MediaRes.find({ estado: "camara" }).populate("tropa");
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

    // Aquí, después de guardar la nueva mediaRes, actualiza la tropa correspondiente
    const tropa = await Tropa.findById(req.body.tropa); // suponiendo que Tropa es el modelo correspondiente a tropaSchema
    if (tropa) {
      tropa.animales.push(newMediaRes._id);
      await tropa.save();
    }

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

const putMediaRes = async (req, res) => {
  const id = req.params.id; // Obtiene el ID desde la URL
  const { fecha, distribuidorId } = req.body; // Datos del formulario de salida

  console.log("aca en la contro", fecha, distribuidorId);
  try {
    // Encuentra la 'res' por ID y actualiza el estado
    const updatedRes = await MediaRes.findByIdAndUpdate(
      id,
      { estado: "despachada" },
      { new: true } // Esta opción retorna el documento modificado
    );

    // Si no se encuentra la 'res' con ese ID, se envía un error 404
    if (!updatedRes) {
      return res.status(404).json({ message: "Res no encontrada" });
    }

    // Ahora, registra la salida con fecha y distribuidor
    const salidaExistente = await Salida.findOne({
      fecha: fecha,
      distribuidor: distribuidorId,
    });

    if (salidaExistente) {
      // Si la salida existe, agrega el ID de la media res a la propiedad 'animales'
      salidaExistente.animales.push(updatedRes._id);
      await salidaExistente.save();
    } else {
      // Si no existe, crea una nueva salida
      const nuevaSalida = new Salida({
        fecha: fecha,
        distribuidor: distribuidorId,
        animales: [updatedRes._id],
      });
      await nuevaSalida.save();
    }

    res.status(200).json(updatedRes);
  } catch (error) {
    console.error("Error al actualizar la res:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/////// TROPA ////////////////

const getTropa = async (req, res) => {
  try {
    const tropa = await Tropa.find();
    res.status(200).json(tropa);
  } catch (error) {
    console.error("Error al recuperar el tropa:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const postTropa = async (req, res) => {
  try {
    console.log("en controllers");
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

const getDetalleTropa = async (req, res) => {
  try {
    const id = req.params.id;
    const tropa = await Tropa.findById(id).populate("animales");
    if (!tropa) {
      return res.status(404).json({ message: "Tropa no encontrada" });
    }
    res.status(200).json(tropa);
  } catch (error) {
    console.error("Error al recuperar el tropa:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/////// DISTRIBUIDORES ////////////////
const getDistribuidores = async (req, res) => {
  try {
    const distribuidores = await Distribuidor.find();
    res.status(200).json(distribuidores);
  } catch (error) {
    console.error("Error al recuperar el distribuidores:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/////// SALIDAS ////////////////
const getSalidas = async (req, res) => {
  try {
    const salidas = await Salida.find()
      .populate("animales")
      .populate("distribuidor");
    res.status(200).json(salidas);
  } catch (error) {
    console.error("Error al recuperar el salidas:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getStock,
  postMediaRes,
  deleteMediaRes,
  getTropa,
  postTropa,
  deleteTropa,
  getDistribuidores,
  putMediaRes,
  getDetalleTropa,
  getSalidas,
};
