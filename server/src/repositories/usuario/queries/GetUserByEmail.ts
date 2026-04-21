import Usuario from "../../../models/Usuario.model.js";

export const getUserByEmail = async(email: string) => {
    const usuario = await Usuario.findOne({ 
        where: { email },
        include: ['roles']
    });
    return usuario 
}