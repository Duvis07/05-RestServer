const { response, request } = require("express");

const { Categoria } = require("../models");

const crearCategoria = async (req, res = response) => {
  // categoria es el nombre del modelo en mayúsculas
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({
    nombre,
  });

  // Verificar si la categoría ya existe en la BD (no se puede repetir)
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar en la BD se verifica que el id sea válido y que exista en la BD y que sea de mongoDB
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  // Guardar DB la categorías
  await categoria.save();

  // Respuesta al cliente un 201 (creado) y la categoría creada
  res.status(201).json(categoria);
};

// Obtener todas las categorías - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      //Muestra el usuario quien creó la categoría y solo el nombre del usuario
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

// Obtener una categoría por id - populate
const obtenerCategoriaPorId = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json(categoria);
};

// Actualizar una categoría por id
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

// Borrar una categoría por id - estado: false
const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  ).populate("usuario", "nombre");

  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  borrarCategoria,
};
