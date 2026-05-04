import { validateAndTransform } from "../../../mapper/generic.js"
import { ProveedorRepository } from "../../../repositories/proveedor/index.js"
import { SupplierResponseSchema, type SupplierDTO } from "../../../schemas/catalog.schema.js"

export class SupplierService {
    constructor() { }

    async getAll() : Promise<SupplierDTO[]>{
        const data = await ProveedorRepository.queries.getAllSupplier()
        return validateAndTransform(SupplierResponseSchema, data)
    }

    async create(proveedorData : SupplierDTO){
        const data = await ProveedorRepository.commands.createSupplier(proveedorData)
        return validateAndTransform(SupplierResponseSchema, data)
    }

    async update(id: number, proveedor: SupplierDTO){
        const data = await ProveedorRepository.commands.updateSupplier(id, proveedor)
        return validateAndTransform(SupplierResponseSchema, data)
    }

    async delete(id: number) : Promise<boolean>{
        const data = await ProveedorRepository.commands.deleteSupplier(id)
        if (!data.success)
            return false
        return true
    }
}