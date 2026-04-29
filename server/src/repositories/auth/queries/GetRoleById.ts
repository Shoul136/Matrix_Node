import Role from "../../../models/Role.model.js"

export const getRoleById = async(id: number) => {
    return await Role.findByPk(id);
}