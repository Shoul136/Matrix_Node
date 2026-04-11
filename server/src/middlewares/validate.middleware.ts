import { type Request, type Response, type NextFunction } from "express";
import { type ZodType } from "zod";

export const validate = (schema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (error) {
            next(error);
        }
    }
}


