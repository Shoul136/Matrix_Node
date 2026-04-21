import Role from "../../../models/Role.model.js"
import Usuario from "../../../models/Usuario.model.js"

export const loginUserCommand = async(email: string) => {
    const user = await Usuario.findOne({
        where: { email },       
        include: [{ model: Role, as: 'roles'}]
    })

    return user?.get({ plain: true})
}