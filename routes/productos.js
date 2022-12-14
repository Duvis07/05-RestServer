const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  borrarProducto,
  actualizarProductoPorId,
} = require("../controllers/productos");
const { existeProductoPorId } = require("../helpers/db-validators");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

//Obtener Todos los productos - publico
router.get("/", obtenerProductos);

//Obtener un producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProductoPorId
);

//Crear producto - privado - cualquier persona con un token válido
router.post("/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo válido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar producto - privado - cualquier persona con un token válido
 router.put(
    "/:id",

    [
        validarJWT,
        check("id", "No es un id de mongo válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        check("categoria", "No es un id de mongo válido").isMongoId(),
        check("categoria").custom(existeCategoriaPorId),
        validarCampos,
    ],
    actualizarProductoPorId
    
);
 
//Borrar producto - Admin - cualquier persona con un token válido y role de admin puede borrar productos
router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id de mongo válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    borrarProducto
);





module.exports = router;
