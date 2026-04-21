import { z } from "zod";
import { UsuarioEnum } from "../models/enums/index.js";

const commonUserFields = z.object({
  nombre: z.string().min(1, "Requerido").max(100),
  apellido_paterno: z.string().min(1, "Requerido").max(60),
  apellido_materno: z.string().min(1, "Requerido").max(60),
  departamento_id: z.number().int().positive()
});

// Esquema para el Registro (Campos obligatorios)
export const RegisterUsuarioSchema = z.object({
  body: commonUserFields.extend({
    email: z.email("Email inválido").max(100),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const ResetPasswordSchema = z.object({
  params: z.object({
    id: z.uuid("ID Inválido")
  }),
  body: z.object({
    newPassword: z.string().min(1, "La contraseña actual es obligatoria"),
    oldPassword: z.string().min(1, "La nueva contraseña debe tener al menos 8 caracteres")
  }),
  query: z.object({}).optional()
})

export const ResetPasswordByTokenSchema = z.object({
  params: z.object({
    token: z.string().min(1, "El token es obligatorio")
  }),
  body: z.object({
    email: z.email('Email inválido"'),
    newPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string()    
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"]
  })
})

export const SendPasswordSchema = z.object({
  body: z.object({
    email: z.email("El Email no puede ser vacío").max(100)
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional()
});

export const UpdateStatusAdminSchema = z.object({
  params: z.object({
    id: z.uuid('Usuario no encontrado...')
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional()
})

// Esquema para el Update del Admin (Todo opcional + Roles)
export const UpdateAdminUsuarioSchema = z.object({
  params: z.object({
    id: z.uuid("ID inválido")
  }),
  body: commonUserFields.extend({
    email: z.email().optional(),
    estatus: z.enum(UsuarioEnum).optional(),
    roles: z.array(z.number()).optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: "Sin cambios" }),
});

// Esquema para el Update del Usuario (Sin Roles, limitado)
export const UpdateUsuarioSchema = z.object({
  body: commonUserFields.pick({
    nombre: true,
    apellido_materno: true,
    apellido_paterno: true
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: "Debes venviar al menos un campo para actualizar"}),
  query: z.object({}).optional(),
  params: z.object({}).optional()
  // Aquí no incluimos roles ni estatus por seguridad
});

// Esquema de lo que el cliente RECIBE
export const UsuarioResponseSchema = commonUserFields.omit({ departamento_id: true }).extend({
  id: z.uuid(),
  email: z.email(),
  estatus: z.enum(UsuarioEnum),
  created_date: z.date(),
  last_modified_date: z.date(),
  // Relaciones
  departamento: z.object({
    id: z.number(),
    nombre: z.string() // O como se llame el campo en tu modelo Departamento
  }).optional(),
  roles: z.array(z.object({
    id: z.number(),
    nombre: z.string()
  })).optional(),
});

export const UsuarioPaginationResponseSchema = z.object({
  totalItems: z.number(),
  data: z.array(UsuarioResponseSchema),
  totalPages: z.number(),
  currentPage: z.number()
})

// Tipos extraídos para tus interfaces
export type RegisterUsuarioDTO = z.infer<typeof RegisterUsuarioSchema>["body"];
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>["body"];
export type ResetPasswordByTokenDTO = z.infer<typeof ResetPasswordByTokenSchema>["body"];
export type UpdateAdminUsuarioDTO = z.infer<typeof UpdateAdminUsuarioSchema>["body"];
export type UpdateUsuarioDTO = z.infer<typeof UpdateUsuarioSchema>["body"];
export type UsuarioResponse = z.infer<typeof UsuarioResponseSchema>;
export type UsuarioPaginationResponse = z.infer<typeof UsuarioPaginationResponseSchema>;
