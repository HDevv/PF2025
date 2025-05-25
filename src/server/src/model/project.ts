import { DataTypes, CreationOptional, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../data/conn';
import { User } from '../model/user';  // 🔥 Import du modèle User

export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    declare id: CreationOptional<number>;
    declare image: string;
    declare description: string;
    declare link: string;
    declare userId: number;  // 🔥 Ajout de l'association avec un user
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: new DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        link: {
            type: new DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ""
        },
        userId: { // 🔥 Clé étrangère pour identifier qui a créé le projet
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: 'id' }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'projects',
        sequelize
    }
);
