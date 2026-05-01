import Permiso from "../../../models/Permiso.model.js"
import { Op } from "sequelize";

export const getPermissionById = async(ids: number[]) => {
    const permissions = await Permiso.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });

    return permissions ? permissions.map(permission => permission.get({plain: true})) : null
}