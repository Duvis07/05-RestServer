const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearCategoria,
  obtenerCategoriaPorId,
  obtenerCategorias,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico - cualquier persona puede ver las categorias
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico - cualquier persona puede ver las categorias
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),

    validarCampos,
  ],
  obtenerCategoriaPorId
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar - privado - cualquier persona con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar una categoria - Admin - cualquier persona con un token válido y role de admin puede borrar categorias
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
