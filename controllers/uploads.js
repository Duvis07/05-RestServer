//response es un objeto que nos permite mandar respuestas al cliente
const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  //preguntar si hay archivos en la petición (req.files) y si no hay archivos, mandar un error 400 (bad request) y un mensaje de error que diga que no hay archivos
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No hay archivos que subir.");
    return;
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

module.exports = {
  cargarArchivo,
};
