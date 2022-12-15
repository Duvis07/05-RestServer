// uuidv4() genera un id único para cada archivo que se sube al servidor
const { v4: uuidv4 } = require("uuid");

//path es un paquete de node que nos permite trabajar con rutas de archivos
const path = require("path");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif", "pdf"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    //buscar el archivo en la petición (req.files.archivo) y guardar el archivo en una variable (archivo)
    const { archivo } = files;
    //obtener la extensión del archivo (archivo.name) y guardarla en una variable (extensionArchivo)
    const nombreCortado = archivo.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar la extensión del archivo (extensionArchivo) y si no es una extensión válida, mandar un error 400 (bad request) y un mensaje de error que diga que la extensión no es válidas
    if (!extensionesValidas.includes(extensionArchivo)) {
      return reject(
        `La extensión ${extensionArchivo} no es permitida, ${extensionesValidas}`
      );
    }

    //generar el nombre del archivo (archivo.name) y guardar el nombre en una variable (nombreArchivo)  - uuidv4() genera un id único
    //para cada archivo que se sube al servidor sube un archivo con un nombre único
    const nombreTemp = uuidv4() + "." + extensionArchivo;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // reject("Error en el servidor"); //para probar el catch
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      //devolver la respuesta al cliente
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
