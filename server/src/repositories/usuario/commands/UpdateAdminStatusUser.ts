import { UsuarioEnum } from "../../../models/enums/index.js"
import Usuario from "../../../models/Usuario.model.js"

export const updateAdminStatusUser = async (id: string) => {
    const user = await Usuario.findOne({ where: { id } });
    if (user) {
        const newStatus = user.estatus === UsuarioEnum.Activo
            ? UsuarioEnum.Inactivo
            : UsuarioEnum.Activo;
        await user.update({ estatus: newStatus })                        
        return user;
    }else{
        throw new Error('Usuario no encontrado')
    }
}