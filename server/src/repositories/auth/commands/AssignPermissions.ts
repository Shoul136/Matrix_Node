import Role from "../../../models/Role.model.js";

export const assignPermissions = async(roleId: number, permissionIds: number[]) => {
    const roleInstance = await Role.findByPk(roleId)
    if(!roleInstance) throw new Error('Role no encontrado')        

    await roleInstance.$set('permisos', permissionIds)

    const updatedRole = await roleInstance.reload({ include: ['permisos']})
    return updatedRole.get({ plain: true })
}