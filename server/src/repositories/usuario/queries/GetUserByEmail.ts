import Usuario from "../../../models/Usuario.model.js";

export const getUserByEmail = async(email: string) => {
    const user = await Usuario.findOne({ 
        where: { email },
        include: ['roles']
    });
    return user ? user.get({ plain: true }) : null
}