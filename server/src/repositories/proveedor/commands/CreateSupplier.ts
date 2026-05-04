import Proveedor from "../../../models/Proveedor.model.js"
import type { SupplierDTO } from "../../../schemas/catalog.schema.js"

export const createSupplier = async ({ nombre, contacto_principal, telefono, email, direccion, rfc, estatus }: SupplierDTO) => {
    const newSupplier = await Proveedor.create({
        nombre,
        contacto_principal,
        telefono,
        email,
        direccion,
        rfc,
        estatus
    })

    return newSupplier ? newSupplier.get({ plain: true }) : null
}