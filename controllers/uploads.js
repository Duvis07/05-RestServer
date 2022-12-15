const { response } = require("express");

const path = require("path");

const cargarArchivo = async (req, res = response) => {
  //preguntar si hay archivos en la petición (req.files) y si no hay archivos, mandar un error 400 (bad request) y un mensaje de error que diga que no hay archivos
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No hay archivos que subir.");
    return;
  }

  //obtener el archivo que se va a subir (req.files.archivo) y el nombre del archivo (req.files.archivo.name)
  if (!req.files.archivo) {
    res.status(400).send("No hay archivo que subir.");
    return;
  }

  //buscar el archivo en la petición (req.files.archivo) y guardar el archivo en una variable (archivo)
  const { archivo } = req.files;

  const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

  archivo.mv(uploadPath, (err) => {
    if (err) {
      res.status(500).send("Error al subir el archivo.");
      return;
    }

    //enviar una respuesta al cliente con el nombre del archivo que se subió
    res.json({
      msg: "Archivo subido correctamente",
      nombre: archivo.name,
    });
  });
};

module.exports = {
  cargarArchivo,
};
