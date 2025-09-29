const express = require('express');
const http = require('http'); 
const { swaggerUi, specs } = require('../config/swagger'); 

const app = express(); 
const server = http.createServer(app); 

const routes = require('../routes/Users') 

if (process.env.NODE_ENV !== "production") { require('dotenv/config'); } 

const { PORT } = process.env; app.use(express.json()); routes(app) // ejemplo básico de endpoint 
app.get("/", (req, res) => { 
  res.json({ message: "Hola mundo desde Express" }); 
}); 

server.listen(PORT, () => { 
  console.log("Servidor corriendo en puerto:", PORT)
});