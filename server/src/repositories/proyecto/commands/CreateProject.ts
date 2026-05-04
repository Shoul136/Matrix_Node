import Proyecto from "../../../models/Proyecto.model.js"
import type { ProjectDTO } from "../../../schemas/catalog.schema.js"

export const createProject = async({nombre, descripcion} : ProjectDTO) => {
    const newProject = await Proyecto.create({
        nombre,
        descripcion
    })

    return newProject ? newProject.get({ plain: true }) : null
}