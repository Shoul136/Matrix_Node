import type Usuario from "../../../models/Usuario.model.js";

export const assignRole = async(usuario: Usuario, roleIds: number[]) =>
{
    return await usuario.$set('roles', roleIds)
}