const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

// Buscar por colección y valida que la colección sea válida (usuarios, categorias, productos)
//y que el id sea válido (ObjectId)
const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  // Si es un id válido, buscar por id si el id no existe, regresa un arreglo vacío y si existe, regresa un arreglo con el usuario
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  // Si no es un id válido, buscar por nombre o correo y regresa un arreglo con los usuarios que coincidan con el termino
  // expresión regular para que sea insensible a mayúsculas y minúsculas
  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    //debe cumplir con una de las dos condiciones 
    $or: [{ nombre: regex }, { correo: regex }],
    //debe cumplir con la condición de que el estado sea true 
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

// Buscar por colección y valida que la colección sea válida (usuarios, categorias, productos)
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  // Si es un id válido, buscar por id si el id no existe, regresa un arreglo vacío y si existe, regresa un arreglo con la categoría
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  // expresión regular para que sea insensible a mayúsculas y minúsculas
  const regex = new RegExp(termino, "i");
  // Si no es un id válido, buscar por nombre y regresa un arreglo con las categorías que coincidan con el termino
  //debe cumplir con la condición de que el estado sea true
  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // TRUE

  // Si es un id válido, buscar por id si el id no existe, regresa un arreglo vacío y si existe, regresa un arreglo con el producto
// populate para mostrar la información de la categoría
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }
// expresión regular para que sea insensible a mayúsculas y minúsculas
  const regex = new RegExp(termino, "i");
  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta búsquda",
      });
  }
};

module.exports = {
  buscar,
};
