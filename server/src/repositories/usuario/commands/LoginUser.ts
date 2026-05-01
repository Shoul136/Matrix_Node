import Role from "../../../models/Role.model.js"
import Usuario from "../../../models/Usuario.model.js"
import Permiso from "../../../models/Permiso.model.js"

export const loginUserCommand = async(email: string) => {
    const user = await Usuario.findOne({
        where: { email },       
        include: [{ model: Role, as: 'roles', include: [Permiso]}]
    })

    return user ? user.get({ plain: true }) : null
}