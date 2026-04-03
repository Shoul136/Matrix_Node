import express from 'express'
import morgan from 'morgan'

const server = express()

server.use(express.json())
server.use(morgan('dev'))

server.get('/', (req, res) => {
    res.send('¡Servidor del ERP funcionando correctamente!');
})

export default server
