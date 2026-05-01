import Usuario from "../../../models/Usuario.model.js"

export const getUserById = async(id : string) => {
    const user = await Usuario.findOne({ 
        where: { id },
        include: ['roles']
    });
    return user ? user.get({ plain: true }) : null
}