const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body; //Obtener el correo y el password del body

  try {
    //Verificar si el email existe en la BD
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //Si el usuario está activo en la BD
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    //Verificar la contraseña del usuario
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id); //El id del usuario es el payload del JWT

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  res.json({
    msg: "googleSignIn",
    id_token,
  });
};

module.exports = {
  login,
  googleSignIn,
};
