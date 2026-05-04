import { z } from "zod"
import { ProveedorEnum, ProyectoEstatus } from "../models/enums/index.js"

export const DepartamentSchema = z.object({
    params: z.object({}).optional(),
    query: z.object({}).optional(),
    body: z.object({
        nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres").nonempty("El campo nombre no puede estar vacío"),
        jefe_departamento: z.uuid('ID inválido').optional()
    })
})

export const UpdateDepartamentSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional("El ID del departamento es requerido")}),
    query: z.object({}).optional(),
    body: DepartamentSchema.shape.body.partial()
})

export const SupplierSchema = z.object({
    params: z.object({}).optional(),
    query: z.object({}).optional(),
    body: z.object({
        nombre: z.string("El tipo de dato no es correcto").min(3, "El nombre debe tener al menos 3 caracteres").nonempty("El campo nombre no puede estar vacío"),
        contacto_principal: z.string("El tipo de dato no es correcto").min(3, "El nombre debe tener al menos 3 caracteres").nonempty("El campo contacto principal no puede estar vacío"),
        telefono: z.string().min(10, "La cantidad de caracteres es de 10 para un número telefonico").max(15).nonempty("El campo telefono no puede estar vacío"),
        email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "El correo no tiene un formato correcto").nonempty("El campo email no puede estar vacío"),
        direccion: z.string("El tipo de dato no es correcto"),
        rfc: z.string().min(12).max(13).nonempty("El campo RFC no puede estar vacío"),
        estatus: z.enum(ProveedorEnum, "El tipo de dato no es correcto").nonoptional("El campo estatus no puede estar vacío")
    })
})

export const UpdateSupplierSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional("El ID del proveedor es requerido")}),
    query: z.object({}).optional(),
    body: SupplierSchema.shape.body.partial()
})

export const ProjectSchema = z.object({
    params: z.object({}).optional(),
    query: z.object({}).optional(),
    body: z.object({
        nombre: z.string().min(5, "El nombre debe tener al menos 3 caracteres").nonempty("El campo nombre no puede estar vacío"),
        descripcion: z.string().min(8, "La descripción debe tener al menos 10 caracteres").nonempty("El campo descripción no puede estar vacío"),
        estatus: z.enum(ProyectoEstatus, "El tipo de dato no es correcto").optional()
    })
})

export const UpdateProjectSchema = z.object({
    params: z.object({id: z.coerce.number().positive().nonoptional("El ID del proyecto es requerido")}),
    query: z.object({}).optional(),
    body: ProjectSchema.shape.body.partial()
})

export const DepartamentResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    jefe: z.object({nombre_completo: z.string()}).nullable().optional(),
    jefe_departamento: z.string().nullable().optional()
}).transform((data) => ({
    id: data.id,
    nombre: data.nombre,
    jefe_departamento: data.jefe ? data.jefe.nombre_completo : "N/A"
}))

export const SupplierResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    contacto_principal: z.string(),
    telefono: z.string(),
    email: z.string(),
    direccion: z.string(),
    rfc: z.string(),
    estatus: z.enum(ProveedorEnum)
})

export const ProjectResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    estatus: z.string()
})

export type DepartamentDTO = z.infer<typeof DepartamentSchema>["body"]
export type SupplierDTO = z.infer<typeof SupplierSchema>["body"]
export type ProjectDTO = z.infer<typeof ProjectSchema>["body"]
export type DepartamentResponseDTO = z.infer<typeof DepartamentResponseSchema>
export type SupplierResponseDTO = z.infer<typeof SupplierResponseSchema>
export type ProjectResponseDTO = z.infer<typeof ProjectResponseSchema>