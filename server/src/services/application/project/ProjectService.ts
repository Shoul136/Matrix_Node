import { validateAndTransform } from "../../../mapper/generic.js"
import { ProjectRepository } from "../../../repositories/proyecto/index.js"
import { ProjectResponseSchema, type ProjectDTO, type ProjectResponseDTO } from "../../../schemas/catalog.schema.js"

export class ProjectService {
    constructor() { }

    async getAll() : Promise<ProjectResponseDTO[]>{
        const data = await ProjectRepository.queries.getAllProject()
        return validateAndTransform(ProjectResponseSchema, data)
    }

    async create(proyectoData : ProjectDTO){
        const data = await ProjectRepository.commands.createProject(proyectoData)
        return validateAndTransform(ProjectResponseSchema, data)
    }

    async update(id: number, proyecto: ProjectDTO){
        const data = await ProjectRepository.commands.updateProject(id, proyecto)
        return validateAndTransform(ProjectResponseSchema, data)
    }

    async delete(id: number) : Promise<boolean>{
        const data = await ProjectRepository.commands.deleteProject(id)
        if (!data.success)
            return false
        return true
    }
}