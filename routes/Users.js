const auth = require("../middlewares/auth");
const controller = require("../controllers/Users");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de autenticación y registro de usuarios
 */

const UserRoutes = (app) => {

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Inicia sesión de usuario
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: orlando@miapp.com
   *               clave:
   *                 type: string
   *                 example: secreto123
   *     responses:
   *       200:
   *         description: Inicio de sesión exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Credenciales inválidas
   */
  app.post("/login", (req, res) => {
    return controller.login(req, res);
  });

  /**
   * @swagger
   * /register:
   *   post:
   *     summary: Registra un nuevo usuario
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserInput'
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Datos inválidos o usuario ya existe
   */
  app.post("/register", (req, res) => {
    return controller.register(req, res);
  });

  /**
   * @swagger
   * /welcome:
   *   get:
   *     summary: Ruta protegida que da la bienvenida al usuario
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Bienvenido
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: Bienvenido.
   *       401:
   *         description: Token inválido o no provisto
   */
  app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Bienvenido.");
  });
};

module.exports = UserRoutes;
