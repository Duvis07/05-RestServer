# RestServer-NodeJs

## Enpoinds
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

