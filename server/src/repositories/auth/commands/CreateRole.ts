import Role from "../../../models/Role.model.js"

export const createRole = async(nombre: any, descripcion: any) => {
    const newRole = await Role.create({
       nombre,
       descripcion
    })

    return newRole ? newRole.get({ plain: true }) : null
}