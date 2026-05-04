import Departamento from "../../../models/Departamento.model.js"

export const deleteDepartament = async(id: number) => {
    const departament = await Departamento.findByPk(id)

    if(!departament)
        throw new Error('El departamento que intentas eliminar no existe')

    await departament.destroy()
    return { success: true}
}