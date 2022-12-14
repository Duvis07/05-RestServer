const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  // Leer el token
  const token = req.header("x-token");

  //console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    // Verificar si el usuario existe en la BD
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en BD",
      });
    }

    //establecer el uid en el request
    req.usuario = usuario;

    // Verificar si el uid tiene estado true o false en la BD (si está activo o no) y
    //si no está activo no se puede autenticar y no se puede hacer nada más en la aplicación
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
