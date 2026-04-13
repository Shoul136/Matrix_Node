import type Role from '../../../models/Role.model.js'
import Usuario from '../../../models/Usuario.model.js'

export interface IAutService {
    createToken(user: Usuario, roles?: Role[]): string;
    getSessionUsuario(token: string): any;
}


