import type Usuario from "../../../models/Usuario.model.js";
import { UsuarioRepository } from "../../../repositories/usuario/index.js";
import { AuthResponseSchema, type AuthLoginDTO, type AuthResponse } from "../../../schemas/auth.schema.js";
import type { IAutService } from "../../infrastructure/security/auth/IAutService.js";
import bcrypt from 'bcrypt'

export class AuthService {
    constructor(private readonly _authService: IAutService) { }

    async login(data: AuthLoginDTO) : Promise<AuthResponse>{
        const user = await UsuarioRepository.commands.login(data.email);
        if (!user) throw new Error("Usuario no encontrado")

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("La contraseña o el nombre de usuario es incorrecto");
        }

        const token = this._authService.createToken(user, user.roles)
        const session = this._authService.getSessionUsuario(token)

        const rawResponse = {
            usuario: user,
            token, 
            session
        }
        
        return AuthResponseSchema.parse(rawResponse)
    }
}