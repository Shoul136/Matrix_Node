import Usuario from "../../../models/Usuario.model.js"

export const assignRole = async(usuarioId: string, roleIds: number[]) =>
{
    const usuarioInstance = await Usuario.findByPk(usuarioId)
    if(!usuarioInstance)
        throw new Error('Usuario no encontrado')

    await usuarioInstance.$set('roles', roleIds)
    await usuarioInstance.reload({ include: ['roles']})
    return usuarioInstance ? usuarioInstance.get({ plain: true }) : null

}