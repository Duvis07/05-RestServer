const express = require("express");
const fileUpload = require("express-fileupload");

// CORS es un paquete que nos permite hacer peticiones desde cualquier origen
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    // Inicializamos variables de entorno y express en el constructor
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      // Ruta con el el login y el registro
      auth: "/api/auth",
      // Ruta con el CRUD de usuarios
      usuarios: "/api/usuarios",
      // Ruta con el CRUD de categorías
      categorias: "/api/categorias",
      // Ruta con el CRUD de productos
      productos: "/api/productos",
      // Ruta para buscar productos y categorías
      buscar: "/api/buscar",
      // Ruta para subir archivos
      uploads: "/api/uploads",
    };

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares es una función que se ejecuta siempre antes de llamar a un controlador
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  // Método para conectar a la base de datos
  async conectarDB() {
    await dbConnection();
  }

  // Middlewares siempre se ejecutan cuando se levanta el servidor
  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));

    //FileUpload - carga de archivos - Carga de imágenes en el servidor - Carga de archivos en el servidor 
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        // crea la carpeta uploads si no existe
        createParentPath: true,
      })
    );
  }

  // Rutas de mi aplicación (endpoints)
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  // Método para iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(" 🐻 Servidor corriendo en puerto", this.port + " 🐻");
    });
  }
}

module.exports = Server;
