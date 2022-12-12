const validarJWT = require("../middlewares/validar-jwt");
const validaRole = require("../middlewares/validar-roles");
const validaCampos = require("../middlewares/validar-campos");

module.exports = {
  ...validarJWT,
  ...validaRole,
  ...validaCampos,
};
