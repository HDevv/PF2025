import { Request, Response, NextFunction } from 'express'
import { sequelize } from "~/data/conn"
import { QueryTypes } from 'sequelize'

export class CStats {
    // Vue d'ensemble du portfolio
    static getPortfolioStats = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const portfolioStats = await sequelize.query(`
                SELECT 
                    COUNT(p.id) as total_projects,
                    COUNT(DISTINCT p.userId) as total_users,
                    COUNT(CASE WHEN p.image IS NOT NULL AND p.image != '' THEN 1 END) as projects_with_image,
                    ROUND(AVG(CASE WHEN p.image IS NOT NULL AND p.image != '' THEN 1 ELSE 0 END) * 100, 1) as projects_with_image_percentage
                FROM projects p
                INNER JOIN users u ON p.userId = u.id
            `, { type: QueryTypes.SELECT });

            const result = portfolioStats[0] as any;
            
            response.json({
                total_projects: parseInt(result.total_projects),
                total_users: parseInt(result.total_users),
                projects_with_image: parseInt(result.projects_with_image),
                projects_with_image_percentage: parseFloat(result.projects_with_image_percentage)
            });
        } catch (e: any) {
            next(e);
        }
    }


    // Évolution temporelle des projets
    static getTimelineStats = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const timelineStats = await sequelize.query(`
                SELECT 
                    strftime('%Y-%m', p.createdAt) as month,
                    COUNT(p.id) as new_projects,
                    GROUP_CONCAT(DISTINCT CASE 
                        WHEN p.description LIKE '%React%' OR p.description LIKE '%react%' THEN 'React'
                        WHEN p.description LIKE '%JavaScript%' OR p.description LIKE '%javascript%' THEN 'JavaScript'
                        WHEN p.description LIKE '%PHP%' OR p.description LIKE '%php%' THEN 'PHP'
                        WHEN p.description LIKE '%SQL%' OR p.description LIKE '%sql%' THEN 'SQL'
                        ELSE 'Web'
                    END) as tech_stack,
                    GROUP_CONCAT(DISTINCT u.email) as contributors
                FROM projects p
                INNER JOIN users u ON p.userId = u.id
                WHERE p.createdAt IS NOT NULL
                GROUP BY strftime('%Y-%m', p.createdAt)
                ORDER BY month DESC
                LIMIT 6
            `, { type: QueryTypes.SELECT });

            const result = timelineStats.map((entry: any) => ({
                month: entry.month,
                new_projects: parseInt(entry.new_projects),
                tech_stack: entry.tech_stack || 'Web'
            }));

            response.json(result);
        } catch (e: any) {
            next(e);
        }
    }
}
