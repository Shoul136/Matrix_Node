import Departamento from "../../../models/Departamento.model.js"

export const getAllDepartament = async() => {
    const departaments = await Departamento.findAll({  
        include: [{
            association: 'jefe',
            attributes: ['nombre', 'apellido_paterno', 'apellido_materno', 'nombre_completo']
        }]
    })

    
    return departaments.map(departament => departament.get({ plain: true }))
}