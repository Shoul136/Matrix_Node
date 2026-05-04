import { validateAndTransform } from "../../../mapper/generic.js"
import { DepartamentoRepository } from "../../../repositories/departamento/index.js"
import { DepartamentResponseSchema, type DepartamentDTO, type DepartamentResponseDTO } from "../../../schemas/catalog.schema.js"

export class DepartamentService {
    constructor() { }

    async getAll() : Promise<DepartamentResponseDTO[]>{
        const data = await DepartamentoRepository.queries.getAllDepartament()
        return validateAndTransform(DepartamentResponseSchema, data)
    }

    async create(departamentoData : DepartamentDTO) : Promise<DepartamentResponseDTO>{
        const data = await DepartamentoRepository.commands.createDepartment(departamentoData)
        return validateAndTransform(DepartamentResponseSchema, data)
    }

    async update(id: number, departamento: DepartamentDTO) : Promise<DepartamentDTO>{
        const data = await DepartamentoRepository.commands.updateDepartament(id, departamento)
        return validateAndTransform(DepartamentResponseSchema, data)
    }

    async delete(id: number) : Promise<boolean>{
        const data = await DepartamentoRepository.commands.deleteDepartament(id)
        if (!data.success)
            return false
        return true
    }
}