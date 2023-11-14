const {
  MediaRes,
  Tropa,
  Distribuidor,
  Salida,
  Productor,
  Lluvia,
} = require("../DB/index.js");

const getStock = async (req, res) => {
  try {
    const stock = await MediaRes.find({ estado: "camara" }).populate("tropa");
    console.log(stock);
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

const putResSalida = async (req, res) => {
  const id = req.params.id; // Obtiene el ID desde la URL
  const { fecha, distribuidorId } = req.body; // Datos del formulario de salida

  try {
    // Encuentra la 'res' por ID y actualiza el estado
    const updatedRes = await MediaRes.findByIdAndUpdate(
      id,
      { estado: "camara" }, // Cambia el estado a "camara"
      { new: true } // Esta opción retorna el documento modificado
    );

    // Si no se encuentra la 'res' con ese ID, se envía un error 404
    if (!updatedRes) {
      return res.status(404).json({ message: "Res no encontrada" });
    }

    // Busca y actualiza la 'salida' para eliminar la res del array "animales"
    const salidaExistente = await Salida.findOne({
      fecha: fecha,
      distribuidor: distribuidorId,
    });

    if (salidaExistente) {
      // Encuentra la posición de la res en el array "animales" y elimínala
      const index = salidaExistente.animales.indexOf(updatedRes._id);
      if (index !== -1) {
        salidaExistente.animales.splice(index, 1);
        await salidaExistente.save();
      }
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
      .populate({
        path: "animales", // Poblar animales (mediares)
        populate: {
          path: "tropa", // Poblar tropa dentro de animales
          model: "tropas", // El nombre del modelo de tropa
        },
      })
      .populate("distribuidor") // Poblar el distribuidor
      .exec();

    res.status(200).json(salidas);
  } catch (error) {
    console.error("Error al recuperar el salidas:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

/////// PRODUCORES ////////////////
const postProductores = async (req, res) => {
  const { productor } = req.body;
  try {
    const nuevoProductor = new Productor({ nombre: productor }); // Crea una nueva instancia de Productor con los datos del cuerpo de la solicitud
    const productorGuardado = await nuevoProductor.save(); // Guarda el nuevo productor en la base de datos
    res.status(201).json(productorGuardado); // Devuelve el nuevo productor guardado
  } catch (error) {
    console.error("Error al crear un productor:", error.message);
    res.status(400).json({ message: "Error al crear el productor" });
  }
};

const getProductores = async (req, res) => {
  try {
    const productores = await Productor.find(); // Busca y obtiene todos los productores en la base de datos
    res.status(200).json(productores); // Devuelve la lista de productores
  } catch (error) {
    console.error("Error al recuperar los productores:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//////// LLUVIAS //////////////
const postLluvia = async (req, res) => {
  try {
    const { fecha, milimetros } = req.body;

    // Crea una nueva instancia de Lluvia utilizando el modelo
    const nuevaLluvia = new Lluvia({
      fecha,
      milimetros,
    });

    // Guarda la nueva entrada en la base de datos
    await nuevaLluvia.save();

    res
      .status(201)
      .json({ mensaje: "Entrada de lluvia agregada correctamente" });
  } catch (error) {
    console.error("Error al agregar entrada de lluvia:", error);
    res.status(500).json({ mensaje: "Error al agregar entrada de lluvia" });
  }
};

const deleteLluvia = async (req, res) => {
  try {
    const idLluvia = req.params.id;

    // Elimina la entrada de lluvia por ID
    await Lluvia.findByIdAndDelete(idLluvia);

    res.json({ mensaje: "Entrada de lluvia eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar entrada de lluvia:", error);
    res.status(500).json({ mensaje: "Error al eliminar entrada de lluvia" });
  }
};

const getLluvias = async (req, res) => {
  try {
    // Obtiene todas las entradas de lluvia de la base de datos
    const lluvias = await Lluvia.find();

    res.json(lluvias);
  } catch (error) {
    console.error("Error al obtener entradas de lluvia:", error);
    res.status(500).json({ mensaje: "Error al obtener entradas de lluvia" });
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
  getProductores,
  postProductores,
  putResSalida,
  getLluvias,
  postLluvia,
  deleteLluvia,
};
