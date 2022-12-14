const express = require("express");

// CORS
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    // Inicializamos variables de entorno y express en el constructor
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      categorias: "/api/categorias",
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
  }

  // Rutas de mi aplicación (endpoints)
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
  }

  // Método para iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(" 🐻 Servidor corriendo en puerto", this.port + " 🐻");
    });
  }
}

module.exports = Server;
