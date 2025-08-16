import Express from 'express'
import { errorHandler, notFound } from './middleware/error'
import { projectRouter } from './router/project'
import { userRouter } from './router/user'
import { statsRouter } from './router/stats'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { BASE_SERVER } from './data/conn'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'

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
  credentials: true
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
app.use("/images", Express.static("./uploads"))

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