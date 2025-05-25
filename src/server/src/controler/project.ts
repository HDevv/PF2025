import { Request, Response, NextFunction } from 'express'
import { Project } from "~/model/project"
import { ExpressError } from "~/middleware/error"
import { BASE_SERVER } from "~/data/conn"
import fs from "fs"
import path from "path"

export class CProject {
    static getAll = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const projects = await Project.findAll()
            response.json(projects)
        } catch (e: any) {
            next(e)
        }
    }
    
    static add = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { description, link } = request.body;
            const userId = (request as any).user?.id;

            if (!userId) {
                throw new ExpressError(401, "Utilisateur non authentifié");
            }

            if (!description) {
                throw new ExpressError(400, "La description est requise");
            }

            const projectData: any = {
                description,
                link: link || "",
                userId
            };

            if (request.file) {
                // Vérifier que le dossier uploads existe
                const uploadsDir = "./uploads";
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }

                projectData.image = `${BASE_SERVER}/images/${request.file.filename}`;
            }

            const newProject = await Project.create(projectData);
            response.status(201).json(newProject);
        } catch (e: any) {
            // Si une erreur survient et qu'un fichier a été uploadé, le supprimer
            if (request.file) {
                const filePath = path.join("./uploads", request.file.filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            next(e);
        }
    }
    
    static delete = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const userId = (request as any).user?.id;

            if (!userId) {
                throw new ExpressError(401, "Utilisateur non authentifié");
            }

            const project = await Project.findOne({ where: { id, userId } });
            if (!project) {
                throw new ExpressError(404, "Projet non trouvé");
            }

            // Supprimer l'image si elle existe
            const oldImgName = project.dataValues.image;
            if (oldImgName) {
                const imagePath = path.join("./uploads", oldImgName.split('/').pop() || "");
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await project.destroy();
            response.status(204).send();
        } catch (e: any) {
            next(e);
        }
    }
}