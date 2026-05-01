import type { Request } from "express";

export interface JWTPayload {
    id: string;
    email: string;
    roles: (number[]),
    permisos: string[];
}

export interface AuthentificatedRequest extends Request{
    user?: JWTPayload
}