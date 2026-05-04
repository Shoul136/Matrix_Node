import Proveedor from "../../../models/Proveedor.model.js"
import type { SupplierDTO } from "../../../schemas/catalog.schema.js"

export const updateSupplier = async(id: number, {nombre, contacto_principal, telefono, email, direccion, rfc, estatus} : SupplierDTO) => {
    const supplier = await Proveedor.findByPk(id)

    if(!supplier)
        throw new Error('Proveedor no encontrado')

    await supplier.update({
        nombre,
        contacto_principal,
        telefono,
        email,
        direccion,
        rfc,
        estatus
    })
    
    return supplier ? supplier.get({ plain: true }) : null
}