import Role from "../../../models/Role.model.js"
import Usuario from "../../../models/Usuario.model.js"

export const paginationUser = async(limit: number, offset: number) => {
    const usuarios = await Usuario.findAndCountAll({
        limit,
        offset,
        include: [{ model: Role, as: 'roles', through: { attributes: [] } }],
        order: [['created_date', 'DESC']]
    })    

    return usuarios
}