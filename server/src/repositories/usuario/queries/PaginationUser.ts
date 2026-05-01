import Role from "../../../models/Role.model.js"
import Usuario from "../../../models/Usuario.model.js"

export const paginationUser = async(limit: number, offset: number) => {
    const result = await Usuario.findAndCountAll({
        limit,
        offset,
        include: [{ model: Role, as: 'roles', through: { attributes: [] } }],
        order: [['created_date', 'DESC']]
    })    

    return {
        count: result.count,
        rows: result.rows.map(user => user.get({ plain: true }))
    };
}