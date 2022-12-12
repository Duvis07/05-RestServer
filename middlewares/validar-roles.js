const { response } = require("express");
const jwt = require("jsonwebtoken");

// Verificar si el usuario es administrador o no (si tiene el rol de administrador o no) y si no lo es no puede hacer nada más en la aplicación
const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

// Verificar si el usuario tiene uno de los roles que se le pasan como argumento (si tiene el rol de administrador o no) y si no lo es no puede hacer nada más en la aplicación
const tieneRole = (...roles) => {
  return (req, res=response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
