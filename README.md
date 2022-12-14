# RestServer-NodeJs

## Usuarios
## Post,Get -->http://localhost:8080/api/usuarios
## Body{
    "nombre": "sofkaU",
    "google":true,
    "correo":"sofkausofka@gmail.com",
    "password":"123456",
    "rol":"ADMIN_ROLE"

}

## Delete, Update -->http://localhost:8080/api/usuarios/id 
## heards--> x-token + token para poder eliminar un usuario de la bd

 ## Login-->http://localhost:8080/api/auth/login
## Body{
 "correo":"sofkausofka@gmail.com",
 "password":"123456"
}


## Autenticacion con google  
## post-->http://localhost:8080/api/google
## Body{
    "id_token":"token de google"
}

## Categorias
## Get, Post-->http://localhost:8080/api/categorias + token en los headers
## Body{
    "nombre":"categoria 1",
}

## Delete, Put-->http://localhost:8080/api/categorias/id


## Productos

## Get, Post-->http://localhost:8080/api/productos + token en los headers
## Body{
    "nombre":"producto 1",
    "precio":100,
    "descripcion":"descripcion del producto",
    "disponible":true,
    "categoria":"id de la categoria"
     "usuario": "id del usuario"
}