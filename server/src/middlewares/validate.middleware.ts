import { type Request, type Response, type NextFunction } from "express";
import { type ZodType } from "zod";

interface SchemaStructure {
    body: any;
    query: any;
    params: any;
}

export const validate = <T extends Partial<SchemaStructure>>(schema: ZodType<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });

            if (validated.body) req.body = validated.body;
            if (validated.query) Object.assign(req.query, validated.query);
            if (validated.params) Object.assign(req.params, validated.params);
            next();
        } catch (error) {
            next(error);
        }
    }
}


