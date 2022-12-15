const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo } = require("../controllers/uploads");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//rutas de mi aplicación

router.post( "/", cargarArchivo
);



module.exports = router;
