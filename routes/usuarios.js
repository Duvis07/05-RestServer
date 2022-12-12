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
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

//rutas de mi aplicación
router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.delete("/", usuariosDelete);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    /*   check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]), */
    check("rol").custom(esRoleValido),

    validarCampos,
  ],

  usuariosPost
);

router.patch("/", usuariosPatch);

module.exports = router;
