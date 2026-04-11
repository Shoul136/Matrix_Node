import express from 'express'
import morgan from 'morgan'
import db from './config/db.js'
import colors from 'colors'
import { seedDatabase } from './data/index.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { validate } from './middlewares/validate.middleware.js'
import { TestSchema } from './schemas/test.schema.js'

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

server.use(globalErrorHandler)

export default server
