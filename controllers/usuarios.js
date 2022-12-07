const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit=1 } = req.query;

  res.json({
    msg: "get API",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.status(400).json({
    msg: "put API",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.status(201).json({
    msg: "post API",
    body,
  });
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
