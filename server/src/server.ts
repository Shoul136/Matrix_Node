import express from 'express'
import morgan from 'morgan'
import db from './config/db.js'
import colors from 'colors'
import { seedDatabase } from './data/index.js'

export async function connectDB()
{
    try {
        await db.authenticate()
        await db.sync({alter: true})

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

export default server
