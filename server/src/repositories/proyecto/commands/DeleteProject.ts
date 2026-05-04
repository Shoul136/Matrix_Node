import Proyecto from "../../../models/Proyecto.model.js"

export const deleteProject= async(id: number) => {
    const project = await Proyecto.findByPk(id)

    if(!project)
        throw new Error('El proyecto que intentas eliminar no existe')

    await project.destroy()
    return { success: true}
}