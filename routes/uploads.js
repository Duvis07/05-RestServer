const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarArchivoSubir, validarCampos } = require("../middlewares");

const router = Router();

//rutas de mi aplicación

router.post("/", validarArchivoSubir, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    // El id debe ser de mongo y la colección debe ser usuarios o productos
    check("id", "El id debe ser de mongo").isMongoId(),
    // El check custom es para validar que la colección sea válida (usuarios o productos) y que el id exista en la colección
    // El segundo parámetro es un arreglo con las colecciones permitidas (usuarios y productos)

    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);

module.exports = router;
