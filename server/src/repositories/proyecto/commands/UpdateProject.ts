import Proyecto from "../../../models/Proyecto.model.js"
import type { ProjectDTO } from "../../../schemas/catalog.schema.js"

export const updateProject = async(id: number, {nombre, descripcion} : ProjectDTO) => {
    const project = await Proyecto.findByPk(id)

    if(!project)
        throw new Error('Proyecto no encontrado')

    await project.update({
        nombre,
        descripcion
    })
    
    return project ? project.get({ plain: true }) : null
}