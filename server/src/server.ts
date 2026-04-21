import express from 'express'
import morgan from 'morgan'
import db from './config/database/db.js'
import colors from 'colors'
import { seedDatabase } from './data/index.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { validate } from './middlewares/validate.middleware.js'
import { TestSchema } from './schemas/test.schema.js'
import { MaildevService } from './services/infrastructure/email/MaildevService.js'
import { TestController } from './controllers/TestController.js'
import { config } from './config/settings/index.js'
import { JwtAuthService } from './services/infrastructure/security/auth/JwtAuthService.js'
import { ManageFileService } from './services/infrastructure/storage/ManageFileService.js'
import { upload } from './middlewares/multer.middleware.js'
import usuarioRouter from './routes/usuario.route.js'

export async function connectDB()
{
    try {
        await db.authenticate()
        await db.sync()

        await seedDatabase()
        console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
        console.log(colors.red.bold('Hubo un error al conectar la BD'));
        console.log(error)
    }
}

await connectDB()
const server = express()

server.use(express.json())
server.use(morgan('dev'))

server.get('/', (req, res) => {
    res.send('¡Servidor del ERP funcionando correctamente!');
})

server.post('/api/test-middleware', validate(TestSchema), (req, res, next) => {
    try {
        if(req.body.email == "error@test.com")
        {
            throw new Error("Simulando fallo de la base de datos en Matrix")
        }
        res.json({ message: "¡Validación exitosa y Pipeline funcionando!" });
    } catch (error) {
        next(error)
    }
})

const emailService = new MaildevService(config.mail.host, config.mail.port, config.settings.base_url_client);
const authService = new JwtAuthService(config.auth.secret, config.auth.expires)
const storageService = new ManageFileService(config.cloudinary.cloud_name, config.cloudinary.api_key, config.cloudinary.api_secret)
const testController = new TestController(emailService, storageService, authService);


server.post('/api/test-email', testController.testEmail)
server.post('/api/test-upload', upload.single('image') ,testController.testUpload)    
server.post('/api/test-auth', testController.testAuth)
server.get('/api/test-pagination', testController.testPagination)
server.use('/api/usuarios', usuarioRouter)

server.use(globalErrorHandler)

export default server
