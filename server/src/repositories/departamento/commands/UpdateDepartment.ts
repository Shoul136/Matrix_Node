import Departamento from "../../../models/Departamento.model.js"
import type { DepartamentDTO } from "../../../schemas/catalog.schema.js"

export const updateDepartament = async(id: number, { nombre, jefe_departamento} : DepartamentDTO) => {
    const departament = await Departamento.findByPk(id)

    if(!departament)
        throw new Error('Departamento no encontrado')

    await departament.update({
        nombre,
        jefe_departamento: jefe_departamento ?? null
    })

    await departament.reload({
        include: [{
            association: 'jefe',
            attributes: ['nombre', 'apellido_paterno', 'apellido_materno', 'nombre_completo']
        }]
    })
    
    return departament ? departament.get({ plain: true }) : null
}