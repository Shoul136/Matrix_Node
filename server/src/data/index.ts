import { exit } from 'node:process'
import db from '../config/db.js'
import colors from 'colors'
import bcrypt from 'bcrypt'
import Departamento from '../models/Departamento.model.js'

import departamentosData from './seeds/Departamento.json' with {type: 'json'};
import usuariosData from './seeds/Usuarios.json' with {type: 'json'};
import Usuario from '../models/Usuario.model.js'

const clearDB = async () => {
    try {
        await db.sync({ force: true })
        console.log('Datos eliminados correctamente...')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

export const seedDatabase = async () => {
    try {
        console.log(colors.bgCyan('Inicializando el proceso de seeding...'))

        const depto_count = await Departamento.count();
        if (depto_count === 0) {
            await Departamento.bulkCreate(departamentosData)
            console.log(colors.green('✔ Departamentos creados correctamente'))
        }

        const user_count = await Usuario.count();
        if (user_count === 0) {
            const userWithHashedPasswords = await Promise.all(
                usuariosData.map(async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                    return {
                        ...user,
                        password: hashedPassword
                    };
                })
            );

            await Usuario.bulkCreate(userWithHashedPasswords);
            console.log(colors.green('✔ Usuarios creados correctamente con contraseñas seguras'));
        }
        console.log(colors.blue.bold('Seeding completado con éxito.'));
    } catch (error) {
        console.log(colors.red.bold('Error en el Seeding:'));
        console.log(error)
        process.exit(1)
    }


}

if (process.argv[2] === '--clear') {
    clearDB()
}