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

// RBAC

export const CreateRoleSchema = z.object({
    params: z.object({}).optional(),
    query: z.object({}).optional(),
    body: z.object({
        nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
        descripcion: z.string().min(5, "La descripción des obligatoria")
    })
})

export const UpdateRoleSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional("El ID del rol es obligatorio")}),
    query: z.object({}).optional(),
    body: CreateRoleSchema.shape.body.partial()
})

export const CreatePermissionSchema = z.object({
    params: z.object({}).optional(),
    query: z.object({}).optional(),
    body: z.object({
        nombre: z.string().regex(/^[a-z]+:[a-z]+$/, "Formato incorrecto, el formato esperado debe ser modulo:accion (ej. users:read)"),
        descripcion: z.string().min(5, "La descripción es obligatoria")    
    })    
})

export const UpdatePermissionSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional('Id del permiso a actualizar no enviado')}),
    query: z.object({}).optional(),
    body: CreatePermissionSchema.shape.body.partial()    
})

export const AssignPermissionSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional('Id del role no enviado')}),
    query: z.object({}).optional(),
    body: z.object({
        permissionIds: z.array(z.number()).nonempty("Debes enviar al menos un permiso")
    })
})

export const AssignRoleSchema = z.object({
    params: z.object({id: z.uuid().nonempty("Id del usuario no enviado")}),
    query: z.object({}).optional(),
    body: z.object({
        roleIds: z.array(z.number()).nonempty("Debes enviar al menos un rol")
    })
})

export const RoleResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    permisos: z.array(z.any()).optional()
})

export const PermissionResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string()
})

export type AuthLoginDTO = z.infer<typeof AuthLoginSchema>["body"]
export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type RoleDTO = z.infer<typeof CreateRoleSchema>["body"]
export type PermissionDTO = z.infer<typeof CreatePermissionSchema>["body"]
export type AssignPermissionDto = z.infer<typeof AssignPermissionSchema>["body"]
export type AssignRoleDto = z.infer<typeof AssignRoleSchema>["body"]
export type RoleResponseDTO = z.infer<typeof RoleResponseSchema>
export type PermissionResponseDTO = z.infer<typeof PermissionResponseSchema>