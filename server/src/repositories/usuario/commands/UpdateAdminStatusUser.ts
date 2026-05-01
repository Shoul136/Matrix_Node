import { UsuarioEnum } from "../../../models/enums/index.js"
import Usuario from "../../../models/Usuario.model.js"

export const updateAdminStatusUser = async (id: string) => {
    const user = await Usuario.findOne({ where: { id } });
    if (!user)
        throw new Error('Usuario no encontrado')

    const newStatus = user.estatus === UsuarioEnum.Activo
        ? UsuarioEnum.Inactivo
        : UsuarioEnum.Activo;
    await user.update({ estatus: newStatus })
    
    return user ? user.get({plain: true}) : null;
}