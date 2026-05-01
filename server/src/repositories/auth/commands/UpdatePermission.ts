import Permiso from "../../../models/Permiso.model.js"

export const updatePermission = async(id: number, data: any) => {
    const permission = await Permiso.findByPk(id)

    if(!permission)
        throw new Error('Permiso no encontrado')

    await permission.update(data)
    
    return permission ? permission.get({ plain: true }) : null
}