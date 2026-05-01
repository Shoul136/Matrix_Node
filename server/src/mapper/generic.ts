import z from "zod"

export function validateAndTransform<T>(schema: z.ZodType<T>, data: any[]): T[];

export function validateAndTransform<T>(schema: z.ZodType<T>, data: any): T;

export function validateAndTransform<T>(schema: z.ZodType<T>, data: any): any {
   if (!data) return data;
    
    if (Array.isArray(data)) {
        return z.array(schema).parse(data);
    }
    
    return schema.parse(data);
}