import { Request, Response, NextFunction } from 'express'
import { User } from "~/model/user"
import { ExpressError } from "~/middleware/error"
import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from "~/data/conn"
import bcrypt from 'bcrypt'

export class CUser {
    static register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, password } = request.body;
            
            if (!email || !password) {
                throw new ExpressError(400, "Email et mot de passe requis");
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new ExpressError(400, "Cet email est déjà utilisé");
            }

            const user = await User.create({
                email,
                password,
                level: 1
            });

            response.status(201).json({ 
                message: "Utilisateur créé avec succès",
                userId: user.id 
            });
        } catch (e: any) {
            next(e);
        }
    }

    static login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { email, password } = request.body;
            
            if (!email || !password) {
                throw new ExpressError(400, "Email et mot de passe requis");
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new ExpressError(401, "Email ou mot de passe incorrect");
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new ExpressError(401, "Email ou mot de passe incorrect");
            }

            const token = jwt.sign(
                { 
                    id: user.id,
                    email: user.email,
                    level: user.level 
                }, 
                SECRET_TOKEN,
                { expiresIn: '24h' }
            );

            response.json({ 
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    level: user.level
                }
            });
        } catch (e: any) {
            next(e);
        }
    }
}