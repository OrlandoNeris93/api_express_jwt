// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.1',                 
    info: {
      title: 'API - Express JWT',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger / OpenAPI 3 '
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {  
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        UserInput: {
          type: 'object',
          required: ['nombre', 'email', 'clave'],
          properties: {
            nombre: { type: 'string', example: 'Orlando' },
            email: { type: 'string', format: 'email', example: 'orlando@miapp.com' },
            clave: { type: 'string', example: 'secreto123' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 123 },
            nombre: { type: 'string' },
            email: { type: 'string' },
            token: { type: 'string' }
          }
        }
      }
    },
    security: [] // seguridad global (vacío si no querés exigir token para todo)
  },
  // indicá los archivos donde están tus rutas/JSdoc
  apis: ['./routes/*.js', './routes/**/*.js'] 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
