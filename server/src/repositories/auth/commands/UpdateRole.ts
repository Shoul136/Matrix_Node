import Role from "../../../models/Role.model.js"

export const updateRole = async(id : number, data : any) => {
    const role = await Role.findByPk(id)
    if(!role)
        throw new Error('Role no encontrado')

    await role.update(data)

    return role ? role.get({ plain: true }) : null;
}