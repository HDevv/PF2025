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

        console.log(`checkToken - Cookie: ${!!cookieToken}, Header: ${!!headerToken}, Token: ${!!token}`);

        if (!token) {
            console.log("No token found, rejecting request");
            throw new ExpressError(401, "Token d'authentification requis");
        }

        const decoded = jwt.verify(token, SECRET_TOKEN) as User;
        console.log(`Token decoded successfully for user: ${decoded.email}`);
        
        if (decoded) {
            req.user = decoded;
            return next();
        }
        throw new ExpressError(401, "Token invalide");
    } catch (e: any) {
        console.log(`checkToken error: ${e.message}`);
        if (e instanceof jwt.JsonWebTokenError) {
            next(new ExpressError(401, "Token invalide"));
        } else {
            next(e);
        }
    }
}