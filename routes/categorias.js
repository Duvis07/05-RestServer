const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico - cualquier persona puede ver las categorias
router.get("/", (req, res) => {
  res.json({
    msg: "get API - controlador",
  });
});

// Obtener una categoria por id - publico - cualquier persona puede ver las categorias
router.get("/:id", (req, res) => {
  res.json({
    msg: "get by id API - controlador",
  });
});

// Crear categoria - privado - cualquier persona con un token válido
router.post("/", (req, res) => {
  res.json({
    msg: "post API - controlador",
  });
});

// Actualizar - privado - cualquier persona con un token válido
router.put("/:id", (req, res) => {
  res.json({
    msg: "put API - controlador",
  });
});

// Borrar una categoria - Admin - cualquier persona con un token válido y role de admin puede borrar categorias
router.delete("/:id", (req, res) => {
  res.json({
    msg: "delete API - controlador",
  });
});

module.exports = router;
