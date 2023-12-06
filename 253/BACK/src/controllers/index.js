const {
  MediaRes,
  Tropa,
  Distribuidor,
  Salida,
  Productor,
  Usuario,
} = require("../DB/index.js");

const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");

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
  const ids = req.params.id.split(","); // Obtiene un array de IDs desde la URL
  const { fecha, distribuidorId } = req.body; // Datos del formulario de salida

  try {
    // Encuentra las 'res' por IDs y actualiza el estado
    const resesToUpdate = await MediaRes.find({ _id: { $in: ids } });

    if (!resesToUpdate || resesToUpdate.length === 0) {
      return res.status(404).json({ message: "Res no encontrada" });
    }

    // Actualiza el estado de las reses encontradas
    const updatedRes = await MediaRes.updateMany(
      { _id: { $in: ids } },
      { estado: "despachada" },
      { new: true }
    );

    // Ahora, registra la salida con fecha y distribuidor
    const salidaExistente = await Salida.findOne({
      fecha: fecha,
      distribuidor: distribuidorId,
    });

    if (salidaExistente) {
      // Si la salida existe, agrega los IDs de las media res a la propiedad 'animales'
      resesToUpdate.forEach((res) => {
        salidaExistente.animales.push(res._id);
      });
      await salidaExistente.save();
    } else {
      // Si no existe, crea una nueva salida
      const nuevaSalida = new Salida({
        fecha: fecha,
        distribuidor: distribuidorId,
        animales: resesToUpdate.map((res) => res._id),
      });
      await nuevaSalida.save();
    }

    res.status(200).json({ message: "Res actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar las reses:", error.message);
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

//////////LOGIN//////////////

const signup = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    console.log("llegue al back", usuario);
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Usuario.findOne({ usuario });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    // hasheamos la contraseña
    const passwordHash = await bcrypt.hash(contraseña, 10);

    // Sino, crear un nuevo usuario
    const newUser = new Usuario({
      usuario,
      contraseña: passwordHash,
      isAdmin: false,
    });

    // Guardar el usuario en la base de datos
    const userSaved = await newUser.save();

    console.log("isAdmin", userSaved.isAdmin);
    //Creamos el token
    const token = await createAccessToken({ id: userSaved._id });

    //Creamos la cookie
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      id: userSaved._id,
      user: userSaved.usuario,
      isAdmin: userSaved.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    // Verificar si el usuario ya existe en la base de datos
    const userFound = await Usuario.findOne({ usuario });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }

    // comparamos las contraseñas
    const isMatch = await bcrypt.compare(contraseña, userFound.contraseña);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect contraseña" });
    }

    //Creamos el token
    const token = await createAccessToken({ id: userFound._id });

    // Respondemos con el token y los detalles del usuario
    res.status(201).json({
      token, // incluimos el token en la respuesta
      id: userFound._id,
      usuario: userFound.usuario,
      isAdmin: userFound.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log("token", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await Usuario.findById(user.id);

    if (!userFound) return res.satus(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      usuario: userFound.usuario,
    });
  });
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
  logIn,
  signup,
  verifyToken,
};
