import Proveedor from "../../../models/Proveedor.model.js"

export const getAllSupplier = async() => {
    const suppliers = await Proveedor.findAll()

    return suppliers.map(supplier => supplier.get({ plain: true }))
}