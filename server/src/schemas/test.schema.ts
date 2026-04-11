import { z } from "zod";

export const TestSchema = z.object({
    body: z.object({
        email: z.email("Correo no válido"),
        edad: z.number().min(18, "Debe ser mayor de edad")
    })
})