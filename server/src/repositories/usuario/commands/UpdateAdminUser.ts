import Departamento from "../../../models/Departamento.model.js";
import Role from "../../../models/Role.model.js";
import Usuario from "../../../models/Usuario.model.js";
import { type UpdateAdminUsuarioDTO } from "../../../schemas/usuario.schema.js";

export const updateAdminUser = async(id: string, usuarioData: UpdateAdminUsuarioDTO) => {
    const updateData = Object.fromEntries(Object.entries(usuarioData).filter(([_, value]) => value !== undefined && value !== null))

    const user = await Usuario.findByPk(id);
    
    if(!user) 
        throw new Error('Usuario no encontrado')

    await user.update(updateData);

    if (usuarioData.roles !== undefined) { 
        await user.$set('roles', usuarioData.roles)
    }

    await user.reload({ include: [{ model: Role, through: { attributes: [] }}, { model: Departamento }]})
    return user ? user.get({ plain: true }) : null
}