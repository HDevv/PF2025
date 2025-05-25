import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

// Définir le chemin vers le dossier data
const dataDir = path.join(__dirname, "../../../data");
const dbPath = path.join(dataDir, "database.sqlite");

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Créer le fichier de base de données s'il n'existe pas
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "");
}

// Configuration de Sequelize
export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
    logging: false, // Désactiver les logs SQL pour la production
    define: {
        // Options globales pour tous les modèles
        freezeTableName: true, // Empêcher Sequelize de modifier les noms de tables
        timestamps: true, // Garder createdAt et updatedAt
    },
});

// Configuration des constantes
export const SECRET_TOKEN = "kawabounga";
export const BASE_SERVER = "http://localhost:5001";

// Initialisation de la base de données
const initDatabase = async () => {
    try {
        // Vérifier la connexion
        await sequelize.authenticate();
        console.log(" Connexion à la base de données établie avec succès.");

        // Synchroniser les modèles avec la base de données
        // force: false - Ne pas supprimer les tables existantes
        await sequelize.sync({ force: false });
        console.log(" Modèles synchronisés avec la base de données");
    } catch (error) {
        console.error(" Erreur lors de l'initialisation de la base de données:", error);
        process.exit(1); // Arrêter le serveur en cas d'erreur critique
    }
};

// Exécuter l'initialisation
initDatabase();
