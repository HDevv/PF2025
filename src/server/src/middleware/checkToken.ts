import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '~/data/conn';
import { Request, Response, NextFunction } from 'express'
import { User } from '~/model/user';
import { ExpressError } from './error';

// Extend Express Request to include user property
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Prefer HttpOnly cookie set at login
        const cookieToken = (req as any).cookies?.access_token as string | undefined;
        const headerToken = req.headers.authorization?.split(" ")[1];
        const token = cookieToken || headerToken || "";

        if (!token) throw new ExpressError(401, "route protégée");

        const decoded = jwt.verify(token, SECRET_TOKEN) as User;
        if (decoded) {
            req.user = decoded;
            return next();
        }
        throw new ExpressError(401, "route protégée");
    } catch (e) {
        next(e);
    }
}