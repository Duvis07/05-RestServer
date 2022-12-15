const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const googleVerify = require("./google-verify");
const subirArchivo = require("./subir-archivo");

//los puntos suspensivos (...) sirven para extraer todas las propiedades de un objeto y ponerlas en un nuevo objeto
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo,
};
