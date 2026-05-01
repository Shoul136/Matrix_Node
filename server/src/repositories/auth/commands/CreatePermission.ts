import Permiso from "../../../models/Permiso.model.js"

export const createPermission = async(nombre: string, descripcion: string) => {
    const newPermission = await Permiso.create({
        nombre,
        descripcion
    })

    return newPermission ? newPermission.get({ plain: true }) : null
}