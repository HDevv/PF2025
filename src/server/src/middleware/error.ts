import { Request, Response, NextFunction } from 'express'

export class ExpressError extends Error {
    statusCode: number;
    
    constructor(code: number, mess: string) {
        super(mess);
        this.name = this.constructor.name;
        this.statusCode = code;
    }
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.error('route not found');
        throw new ExpressError(404, "Route non trouvée");
    }
    catch (e) {
        next(e);
    }
}

export const errorHandler = (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.statusCode || 500).send((Object.keys(err).length === 0) ? { message: "erreur inconnue" } : err);
}