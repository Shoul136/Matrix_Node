import { exit } from 'node:process'
import db from '../config/database/db.js'
import colors from 'colors'
import bcrypt from 'bcrypt'
import Departamento from '../models/Departamento.model.js'

import departamentosData from './seeds/Departamento.json' with {type: 'json'};
import usuariosData from './seeds/Usuarios.json' with {type: 'json'};
import Usuario from '../models/Usuario.model.js'
import Role from '../models/Role.model.js'
import { RolesEnum } from '../models/enums/index.js'
import Permiso from '../models/Permiso.model.js'
import RolePermiso from '../models/RolePermiso.model.js'

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

        const rolesCount = await Role.count()
        if (rolesCount === 0) {
            await Role.bulkCreate([
                { id: RolesEnum.ADMIN, nombre: 'ADMIN', descripcion: 'Control total del sistema' },
                { id: RolesEnum.MANAGER, nombre: 'MANAGER', descripcion: 'Gestión de departamentos' },
                { id: RolesEnum.USER, nombre: 'USER', descripcion: 'Acceso estándar' }
            ]),
                console.log(colors.green('✔ Roles creados correctamente'));
                
                if (db.getDialect() === 'postgres') {
                    await db.query(`SELECT setval(pg_get_serial_sequence('role', 'id'), (SELECT MAX(id) FROM "role"))`);
                }
        }

        const permisoCount = await Permiso.count();
        if (permisoCount === 0) {
            const permisos = await Permiso.bulkCreate([
                { nombre: 'usuarios:leer', descripcion: 'Listar y buscar usuarios' },
                { nombre: 'usuarios:escribir', descripcion: 'Crear y editar usuarios' },
                { nombre: 'config:total', descripcion: 'Acceso a configuraciones críticas' }
            ]);

            // 3. Vincular Permisos a Roles (RolePermiso)
            // El ADMIN recibe todo
            const allPermisos = permisos.map(p => ({
                role_id: RolesEnum.ADMIN,
                permiso_id: p.id
            }));

            // El USER solo recibe lectura
            const userPermisos = permisos
                .filter(p => p.nombre === 'usuarios:leer')
                .map(p => ({
                    role_id: RolesEnum.USER,
                    permiso_id: p.id
                }));

            await RolePermiso.bulkCreate([...allPermisos, ...userPermisos]);
            console.log(colors.green('✔ Permisos creados y vinculados a Roles'));
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

            const createdUsers = await Usuario.bulkCreate(userWithHashedPasswords);
            for (const user of createdUsers) {
                if (user.email === 'luisrqvg@gmail.com') {
                    await user.$set('roles', [RolesEnum.ADMIN]);
                } else {
                    await user.$set('roles', [RolesEnum.USER]);
                }
            }
            console.log(colors.green('✔ Usuarios creados y roles vinculados'));
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