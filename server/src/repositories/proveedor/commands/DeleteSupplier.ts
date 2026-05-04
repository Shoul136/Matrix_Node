import Proveedor from "../../../models/Proveedor.model.js"

export const deleteSupplier = async(id: number) => {
    const supplier = await Proveedor.findByPk(id)

    if(!supplier)
        throw new Error('El proveedor que intentas eliminar no existe')

    await supplier.destroy()
    return { success: true}
}