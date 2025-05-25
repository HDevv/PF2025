import express from 'express';
import { CUser } from '~/controler/user';
import { checkToken } from '~/middleware/checkToken';

export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              email
 *              password
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto generated id of the user
 *              email:
 *                  type: string
 *                  description: The email of the user
 *              password:
 *                  type: string
 *                  description: The password of the user
 *              level:
 *                  type: number
 *                  description: Not used in this version of the API
 *          example:
 *              id: 1
 *              email: admin@test.com
 *              password: test
 *      Token:
 *          type: object
 *          required: token
 *          properties:
 *              token:
 *                  type: string
 *                  description: Token d'authentification de l'utilisateur
 *  securitySchemes:
 *      api_key:
 *          type: apiKey
 *          name: Authorization
 *          in: header
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */




/**
 * @swagger
 * /api/users/register:
 *   post:
 *     description: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 */
userRouter.post('/register', CUser.register)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: The user was not found
 */
userRouter.post('/login', CUser.login)