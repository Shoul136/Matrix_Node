import Permiso from "../../../models/Permiso.model.js"

export const deletePermission = async(id: number) => {
    const permission = await Permiso.findByPk(id)

    if(!permission)
        throw new Error('El permiso que intentas eliminar no existe')

    await permission.destroy()
    return { success: true}
}