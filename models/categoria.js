const { Schema, model } = require("mongoose");

// Definición del Schema de la colección de categorías (tabla de categorías) 
const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  // Relación con la colección de usuarios (usuario que creó la categoría) - 1 a muchos (1 usuario puede crear muchas categorías) 
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// Para que no se muestre el estado y la versión en el json
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...categoria } = this.toObject();
  return categoria;
};


module.exports = model("Categoria", CategoriaSchema);
