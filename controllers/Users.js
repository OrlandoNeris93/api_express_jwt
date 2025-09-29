const UsersData = require('../dataModels/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== "production") {
  require('dotenv/config');
}

const { KEY } = process.env;

let newUser = {}; // emulacion de datos.
let users = []; // emulacion de datos.

const register = async (req,res) => {
    
    try{

        if(!req.body){
            return res.status(400).send("El formulario no puede ir vacio");
        }
        const {nombre, email, clave} = req.body;

        if(!(nombre && email && clave)){
            return res.status(400).send("Todos los campos son obligatorios.");
        }

        const userExist = users.find(user => user.email === email )
        
        if(userExist){
           return res.status(400).send("El email ya existe registrado.");
        }

        const encrypPassword = await bcrypt.hash(clave, 10);
        newUser = UsersData.User(nombre,email,encrypPassword);                
        users = [...users, newUser];
        return res.status(201).json(newUser);

    }catch(err){
        return res.status(500).send("Error interno del servidor");
    }

   
}

const login = async (req,res) => {

    try{

        if(!req.body){
            return res.status(400).send("El formulario no puede ir vacio");
        }

        const {email, clave} = req.body;

        if(!(email && clave)){
            return res.status(400).send("Todos los campos son obligatorios.");
        }

        const user = users.find(user => user.email === email )
        
        if(user && (await bcrypt.compare(clave, user.clave)) ){

            const token = jwt.sign({email}, KEY, {expiresIn:"1h"})
            user.token = token;
            return res.status(200).json(user);

        }else{
            return res.status(403).send("Credenciales invalidas ");
        }

    }catch(err){
        return res.status(500).send("Error interno del servidor");
    }
}

module.exports = {register,login};