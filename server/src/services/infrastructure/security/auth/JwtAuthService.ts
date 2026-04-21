import jwt from 'jsonwebtoken'
import Role from "../../../../models/Role.model.js";
import Usuario from "../../../../models/Usuario.model.js";
import { type IAutService } from "./IAutService.js";
import bcrypt from 'bcrypt'
import type { ServiceResponse} from '../../../../interfaces/service.interface.js';
import type { JWTPayload } from '../../../../interfaces/jwtPayload.interface.js';

export class JwtAuthService implements IAutService {
    constructor(private readonly _secret: string, private readonly _expires: string) { }

    createToken(user: Usuario, roles: Role[] = []): string {
        const payload =
        {
            id: user.id,
            email: user.email,
            roles: roles.map(role => role.id)
        };

        return jwt.sign(payload, this._secret, { expiresIn: this._expires as any });
    }

    getSessionUsuario(token: string): JWTPayload | null{
        try {
            return jwt.verify(token, this._secret) as JWTPayload
        } catch (error) {
            return null;
        }
    }

    async verifyHashedPassword(user_id: string, newPassword: string, oldPassword: string): Promise<ServiceResponse> {
        const userCurrently = await Usuario.findOne({ where: { id: user_id } })

        if (userCurrently == null)
            return { success: false, message: "El usuario no existe en la base de datos", code: "USER_NOT_FOUND" }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, userCurrently.password);

        if (!isOldPasswordCorrect) {
            return { 
                success: false, 
                message: "La contraseña actual es incorrecta", 
                code: "OLD_PASSWORD_INVALID" 
            };
        }

        const isSameAsOld = await bcrypt.compare(newPassword, userCurrently.password);

        if (isSameAsOld) {
            return {
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior",
                code: "PASSWORD_ALREADY_USED"
            };
        }

        return { success: true, message: "Validación exitosa" };
    }

    async hashPassword(password: string | undefined | null): Promise<string> {
        if (!password || password.trim().length === 0) 
            throw new Error('PASSWORD_INVALID')

        const hashedPassword = await bcrypt.hash(password!, 10)

        return hashedPassword
    }

    generateResetToken(user_id: string) : string {
        return jwt.sign({ id: user_id, type: 'reset'}, this._secret, { expiresIn: '15m'})
    }

    verifyResetToken(token: string): { id: string; } | null {
        try {
            const decoded = jwt.verify(token, this._secret) as JWTPayload
            return { id: decoded.id}
        } catch (error) {
            return null
        }
    }
}