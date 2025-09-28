const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  require('dotenv/config');
}

const { PORT } = process.env;
app.use(express.json());

// --- configuración swagger ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API con Express",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
  },
  apis: ["./routes/*.js"], // acá busca la doc de tus rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ---------------------------------

// ejemplo básico de endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo desde Express" });
});

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto:", PORT);
  console.log(`Swagger docs en http://localhost:${PORT}/api-docs`);
});
