const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPut,
} = require("../controllers/usuarios");

const router = Router();

//ruta de mi aplicación

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

router.post("/", usuariosPost);

router.patch("/", usuariosPatch);

module.exports = router;
