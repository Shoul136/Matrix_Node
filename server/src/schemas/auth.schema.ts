import { z } from "zod"
import { UsuarioResponseSchema } from "./usuario.schema.js"

export const AuthLoginSchema = z.object({
    body: z.object({
        email: z.email("Email inválido").max(100),
        password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional()
})

export const AuthResponseSchema = z.object({
    usuario: UsuarioResponseSchema,
    token: z.string(),
    session: z.any()
})

export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>["body"]
export type AuthResponse = z.infer<typeof AuthResponseSchema>