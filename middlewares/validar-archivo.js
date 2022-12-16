const { response } = require("express");


//validarArchivoSubir es una función que recibe la petición (req), la respuesta (res) si no hay archivos, mandar un error 400 (bad request) y un mensaje de error que diga que no hay archivos
const validarArchivoSubir = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res
      .status(400)
      .json({ msg: "No hay archivos que subir- ValidarArchivoSubir" });
  }
  next();
};

module.exports = {
  validarArchivoSubir,
};
