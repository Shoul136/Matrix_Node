import type { ServiceResponse } from "../../../interfaces/service.interface.js";
import { validateAndTransform } from "../../../mapper/generic.js";
import { UsuarioRepository } from "../../../repositories/usuario/index.js";
import { UsuarioPaginationResponseSchema, UsuarioResponseSchema, type RegisterUsuarioDTO, type ResetPasswordByTokenDTO, type ResetPasswordDto, type UpdateAdminUsuarioDTO, type UpdateUsuarioDTO, type UsuarioPaginationResponse, type UsuarioResponse } from "../../../schemas/usuario.schema.js";
import { getPaginationOptions, getPagingData } from "../../../utils/pagination.js";
import type { IEmailService } from "../../infrastructure/email/IEmailService.js";
import type { IAutService } from "../../infrastructure/security/auth/IAutService.js";


export class UserService {
    constructor(
        private readonly _authService: IAutService,
        private readonly _emailService: IEmailService    
    ) {}
    
    async registerUser(usuario: RegisterUsuarioDTO) : Promise<UsuarioResponse>{
        const registeredUser = await UsuarioRepository.commands.register(usuario);
        return validateAndTransform(UsuarioResponseSchema, registeredUser)
    }

    async resetPassword(user_id: string, data: ResetPasswordDto) : Promise<ServiceResponse>
    {
        const user = await UsuarioRepository.queries.getUserById(user_id)
        if(!user)
            return { success: false, message: "Usuario no encontrado", code: "USER_NOT_FOUND" };

        const validation = await this._authService.verifyHashedPassword(user_id, data.newPassword, data.oldPassword)

        if(!validation.success)
            return validation

        const newPasswordHashed = await this._authService.hashPassword(data.newPassword)
        
        const updated = await UsuarioRepository.commands.resetPassword(user_id, newPasswordHashed)

        if(!updated)
        {
          return { success: false, message: "No se pudo actualizar la contraseña", code: "UPDATE_FAILED" };
        }

        return { success: true, message: "Contraseña actualizada correctamente" };
    }

    async resetPasswordByToken(token: string, data: ResetPasswordByTokenDTO) : Promise<boolean>
    {
        const user = await UsuarioRepository.queries.getUserByEmail(data.email)
        if(!user) throw new Error('El email no está registrado')

        if (user.email !== data.email) 
            throw new Error('El email proporcionado no coincide con el token');

        const tokenData = await this._authService.verifyResetToken(token)

        if(!tokenData || tokenData.id !== user.id)
            throw new Error('Token inválido')

        const hashedPassword = await this._authService.hashPassword(data.newPassword)
        const updated = await UsuarioRepository.commands.resetPasswordByToken(user.id, hashedPassword)

        return updated;            
    }

    async sendPassword(email: string) : Promise<boolean>{     
        const user = await UsuarioRepository.queries.getUserByEmail(email)
        if(!user)
            throw new Error('No se encontro el usuario en la BD')

        const token = this._authService.generateResetToken(user.id)
        await this._emailService.sendPasswordReset(
            email,
            'Cambiar el password',
            'Resetear el password, dale click: ',
            token      
        )

        return true;
    }

    async updateAdminStatusUser(user_id: string) : Promise<UsuarioResponse>{
        const data = await UsuarioRepository.commands.updateAdminStatusUser(user_id)
        return validateAndTransform(UsuarioResponseSchema, data)
    }

    async updateAdminUser(id: string, usuarioData: UpdateAdminUsuarioDTO) : Promise<UsuarioResponse>{
        const data = await UsuarioRepository.commands.updateAdminUser(id, usuarioData)
        return validateAndTransform(UsuarioResponseSchema, data)
    }

    async updateUser(user_id: string, usuarioData: UpdateUsuarioDTO) : Promise<UsuarioResponse>{
        const data = await UsuarioRepository.commands.updateUser(user_id, usuarioData)
        return validateAndTransform(UsuarioResponseSchema, data)
    }

    async getUserById(id: string) : Promise<UsuarioResponse>
    {
        const data = await UsuarioRepository.queries.getUserById(id)
        if(!data)
            throw new Error('No se encontro ningun usuario con este id')

        return validateAndTransform(UsuarioResponseSchema, data)
    }

    async getUserByEmail(email: string) : Promise<UsuarioResponse>
    {
        const data = await UsuarioRepository.queries.getUserByEmail(email)
        if(!data)
            throw new Error('No se encontro ningun usuario con este correo')

        return validateAndTransform(UsuarioResponseSchema, data)
    }

    async paginationUser(page: number, size: number) : Promise<UsuarioPaginationResponse>
    {
        const { limit, offset } = getPaginationOptions(Number(page), Number(size))     
        
        const rawData = await UsuarioRepository.queries.paginationUser(limit, offset);
        const result = getPagingData(rawData, Number(page), limit)
        
        return validateAndTransform(UsuarioPaginationResponseSchema, result)
    }
}