import express from 'express';
import { CStats } from '~/controler/stats';

export const statsRouter = express.Router();

/**
 * @swagger
 * /api/stats/portfolio:
 *   get:
 *     summary: Récupère les statistiques générales du portfolio
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Statistiques du portfolio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_projects:
 *                   type: integer
 *                 total_users:
 *                   type: integer
 *                 projects_with_image:
 *                   type: integer
 *                 projects_with_image_percentage:
 *                   type: number
 */
statsRouter.get('/portfolio', CStats.getPortfolioStats);


/**
 * @swagger
 * /api/stats/timeline:
 *   get:
 *     summary: Récupère l'évolution temporelle des projets
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Timeline des projets par mois
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                   new_projects:
 *                     type: integer
 *                   tech_stack:
 *                     type: string
 */
statsRouter.get('/timeline', CStats.getTimelineStats);
