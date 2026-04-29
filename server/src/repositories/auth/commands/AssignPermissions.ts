import type Role from "../../../models/Role.model.js";

export const assignPermissions = async(role: Role, permissionIds: number[]) => {
    return await role.$set('permisos', permissionIds)
}