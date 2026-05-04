import Proyecto from "../../../models/Proyecto.model.js"

export const getAllProject = async() => {
    const projects = await Proyecto.findAll()

    return projects.map(project => project.get({ plain: true }))
}