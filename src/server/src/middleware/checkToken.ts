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
        let token = "";
        if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, SECRET_TOKEN) as User;
            console.log(decoded);
            if (decoded) {
                req.user = decoded;
                next();
            } else {
                throw new ExpressError(401, "route protégée");
            }
        } else {
            throw new ExpressError(401, "route protégée");
        }
    } catch (e) {
        next(e);
    }
}