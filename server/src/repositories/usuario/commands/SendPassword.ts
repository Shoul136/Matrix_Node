import Usuario from "../../../models/Usuario.model.js"
import type { UsuarioResponse } from "../../../schemas/usuario.schema.js";

export const sendPassword = async(email: string) : Promise<UsuarioResponse | null> => {
    const user = await Usuario.findOne({ 
        where: {email}, 
        include: ['roles']
    })
    return user;
}