import express from 'express';
import { CProject } from '~/controler/project';
import { checkToken } from '~/middleware/checkToken';
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Secure multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // Generate safe filename with UUID to prevent conflicts
    const ext = path.extname(file.originalname).toLowerCase()
    const safeName = `${uuidv4()}${ext}`
    cb(null, safeName)
  }
})

// File filter for security
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp']
  const ext = path.extname(file.originalname).toLowerCase()
  
  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Type de fichier non autorisé. Seuls JPG, PNG et WebP sont acceptés.'), false)
  }
}

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1
  }
})

export const projectRouter = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Project:
 *          type: object
 *          required:
 *              description
 *              link
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto generated id of the project
 *              description:
 *                  type: string
 *                  description: The description of the project
 *              link:
 *                  type: string
 *                  description: The link of the project
 *              image:
 *                  type: string
 *                  description: The image link of the project
 *          example:
 *              id: 1
 *              description: A test description
 *              link: https://www.google.fr
 *              image: https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80
 *      ProjectSend:
 *          type: object
 *          required:
 *              description
 *              link
 *          properties:
 *              id:
 *                  type: number
 *                  description: The auto generated id of the project
 *              description:
 *                  type: string
 *                  description: The description of the project
 *              link:
 *                  type: string
 *                  description: The link of the project
 *              image:
 *                  type: string
 *                  format: binary
 *                  description: The image file of the project
 */

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: The projects managing API
 */

/**
 * @swagger
 * /projects:
 *  get:
 *      summary: Returns the list of all the projects
 *      tags: [Projects]
 *      responses:
 *          200:
 *              descriptions: The list of the projects
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Project'
 */
projectRouter.get('/', CProject.getAll)

/**
 * @swagger
 * /projects:
 *  post:
 *      summary: Add a new project
 *      tags: [Projects]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/ProjectSend'
 *      responses:
 *          200:
 *              description: The project created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Project'
 *          401:
 *              description: Authorization needed
 *      security:
 *          - api_key: []
 */
projectRouter.post('/', checkToken as any, upload.single('image'), CProject.add as any)


/**
 * @swagger
 * /projects/{id}:
 *  put:
 *      summary: Update a project by id
 *      tags: [Projects]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The project id
 *      requestBody:
 *          required: false
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/ProjectSend'
 *      responses:
 *          200:
 *              description: The updated project
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Project'
 *          401:
 *              description: Authorization needed
 *          404:
 *              description: Project not found
 *      security:
 *          - api_key: []
 */
projectRouter.put('/:id', checkToken as any, upload.single('image'), CProject.update as any)

/**
 * @swagger
 * /projects/{id}:
 *  delete:
 *      summary: Delete the project by id
 *      tags: [Projects]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: The project id
 *      responses:
 *          200:
 *              description: The project description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Project'
 *          410:
 *              description: The project was not found
 *          401:
 *              description: Authorization needed
 *      security:
 *          - api_key: []
 */
projectRouter.delete('/:id', checkToken as any, CProject.delete as any)

