import Role from "../../../models/Role.model.js"

export const getAllRoles = async() => {
    const roles = await Role.findAll()
    return roles
}