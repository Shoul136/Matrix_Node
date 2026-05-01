import Role from "../../../models/Role.model.js"

export const getAllRoles = async() => {
    const roles = await Role.findAll({
        include: ['permisos']
    })

    return roles.map(role => role.get({ plain: true }))
}