import jwt from 'jsonwebtoken'
import type Role from "../../../models/Role.model.js";
import type Usuario from "../../../models/Usuario.model.js";
import { type IAutService } from "./IAutService.js";

export class JwtAuthService implements IAutService{
    constructor(private readonly _secret: string, private readonly _expires: string) {}

    createToken(user: Usuario, roles: Role[] = []) : string
    {
        const payload = 
        {
            id: user.id,
            email: user.email,            
            roles: roles.map(role => role.nombre)
        };

        return jwt.sign(payload, this._secret, { expiresIn: this._expires as any});
    }

    getSessionUsuario(token: string) : any{
        try {
            return jwt.verify(token, this._secret)
        } catch (error) {
            return null
        }
    }
}