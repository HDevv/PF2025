import Express from 'express'
import { userRouter } from './router/user'
import { projectRouter } from './router/project'
import { statsRouter } from './router/stats'
import { notFound, errorHandler } from './middleware/error'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { BASE_SERVER } from './data/conn'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import path from 'path'
import fs from 'fs'

const port = 5001
const app = Express()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "React Crud API",
            version: "1.0.0",
            description: "Un serveur d'API pour un CRUD simple"
        },
        servers: [
            {
                url: `${BASE_SERVER}/api`
            }
        ]
    },
    apis: ["./src/router/*.ts"]
}

const specs = swaggerJSDoc(options)

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200
}))
// Security middlewares
app.use(helmet({
  contentSecurityPolicy: false // assoupli en dev; à affiner en prod
}))
app.use(cookieParser())
// Rate limiting for login to mitigate brute force
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  standardHeaders: true,
  legacyHeaders: false
})
app.use(Express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
// Route spécifique pour servir les images avec CORS
app.get("/images/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "../uploads", filename);
    
    console.log(`Image requested: ${filename}`);
    console.log(`File path: ${filepath}`);
    
    // Headers CORS explicites
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filepath)) {
        return res.status(404).send('Image not found');
    }
    
    // Servir le fichier
    res.sendFile(filepath);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Apply limiter before mounting the user router so it takes effect
app.use('/api/users/login', loginLimiter)
app.use('/api/users', userRouter)
app.use('/api/projects', projectRouter)
app.use('/api/stats', statsRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Serveur API lancé sur http://127.0.0.1:${port}`)
})