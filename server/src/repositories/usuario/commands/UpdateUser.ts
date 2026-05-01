import Usuario from "../../../models/Usuario.model.js"
import { type UpdateUsuarioDTO } from "../../../schemas/usuario.schema.js";

export const updateUser = async(user_id: string, usuarioData : UpdateUsuarioDTO) => {
    const updateData = Object.fromEntries(Object.entries(usuarioData).filter(([_, value]) => value !== undefined && value !== null))
    const user = await Usuario.findByPk(user_id);

    if(!user)
        throw new Error('Usuario no encontrado')

    await user.update(updateData)    
    await user.reload()
    return user ? user.get({ plain: true }) : null
}