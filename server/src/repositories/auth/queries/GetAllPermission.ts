import Permiso from "../../../models/Permiso.model.js"

export const getAllPermission = async() => {
    const permissions = await Permiso.findAll()
    return permissions
}