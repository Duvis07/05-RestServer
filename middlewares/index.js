const validarJWT = require("../middlewares/validar-jwt");
const validaRole = require("../middlewares/validar-roles");
const validaCampos = require("../middlewares/validar-campos");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validarJWT,
  ...validaRole,
  ...validaCampos,
  ...validarArchivo,
};
