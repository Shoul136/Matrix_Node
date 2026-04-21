import { RolesEnum } from "../../../models/enums/index.js";
import bcrypt from 'bcrypt'
import Usuario from "../../../models/Usuario.model.js";
import type { RegisterUsuarioDTO } from "../../../schemas/usuario.schema.js";
import Role from "../../../models/Role.model.js";

export const registerUser = async (usuario: RegisterUsuarioDTO) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(usuario.password!, salt)
    
    const newUser = await Usuario.create({
        nombre: usuario.nombre,
        apellido_paterno: usuario.apellido_paterno,
        apellido_materno: usuario.apellido_materno,
        email: usuario.email,
        departamento_id: usuario.departamento_id,
        password: hashedPassword
    })

    await newUser.$set('roles', [RolesEnum.USER])

    return await newUser.reload({
        include: [{ model: Role, as: 'roles', through: { attributes: []}}]
    })
}