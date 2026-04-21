import Usuario from "../../../models/Usuario.model.js"

export const getUserById = async(id : string) => {
    const usuario = await Usuario.findOne({ 
        where: { id },
        include: ['roles']
    });
    return usuario 
}