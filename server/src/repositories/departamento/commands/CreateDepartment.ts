import Departamento from "../../../models/Departamento.model.js"
import type { DepartamentDTO } from "../../../schemas/catalog.schema.js"

export const createDepartment = async({nombre, jefe_departamento} : DepartamentDTO) => {
    const newDepartament = await Departamento.create({
        nombre,
        jefe_departamento
    })

    await newDepartament.reload({
        include: [{
            association: 'jefe',
            attributes: ['nombre', 'apellido_paterno', 'apellido_materno', 'nombre_completo']
        }]
    })

    return newDepartament ? newDepartament.get({ plain: true }) : null
}