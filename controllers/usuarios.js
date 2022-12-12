const { response, request } = require("express");

//Encriptar contraseñas
const bcryptjs = require("bcryptjs");

//Modelo de usuario
const Usuario = require("../models/usuario");

//Validar campos
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  /*  const { q, nombre = "No name", apikey, page = 1, limit = 1 } = req.query; */

  //paginación de usuarios con skip y limit de mongoose (skip salta los primeros 5 y limit muestra 5)
  const { limite = 5, desde = 10 } = req.query;
  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));

  res.json(usuarios);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  //Actualizar usuario
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

//Crear usuario por POST
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json(usuario);
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
