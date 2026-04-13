import { Sequelize } from 'sequelize-typescript'
import * as models from '../../models/index.js'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: Object.values(models),
    logging: false
})

export default db;