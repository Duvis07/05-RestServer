const { Router } = require("express");
//eXpress validator para validar los campos
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const Role = require("../models/role");
const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
} = require("../controllers/usuarios");
const role = require("../models/role");

const router = Router();

//rutas de mi aplicación

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    /*   check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
      }
    }),

    validarCampos,
  ],

  usuariosPost
);

router.patch("/", usuariosPatch);

module.exports = router;
