import { Op } from "sequelize";
import Role from "../../../models/Role.model.js"

export const getRoleById = async(id: number) => {
    const role = await Role.findByPk(id);
    return role ? role.get({plain : true}) : null
}

export const getRolesById = async(ids: number[]) => {
    const roles = await Role.findAll({
        where: {
            id:{
                [Op.in]: ids
            }            
        }
    })

    return roles ? roles.map(role => role.get({ plain: true })) : null
}