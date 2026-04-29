import type { ServiceResponse } from '../../../../interfaces/service.interface.js';
import type Role from '../../../../models/Role.model.js'
import Usuario from '../../../../models/Usuario.model.js'

export interface IAutService {
    createToken(user: Usuario, roles?: Role[], permisos?: string[]): string;
    getSessionUsuario(token: string): any;
    verifyHashedPassword(user_id: string, newPassword: string,  oldPassword: string) : Promise<ServiceResponse>;
    hashPassword(password: string | undefined | null) : Promise<string>
    generateResetToken(user_id: string) : string
    verifyResetToken(token: string) : { id: string} | null
}


