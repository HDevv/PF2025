import { Sequelize, DataTypes, CreationOptional, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../data/conn';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare level: number
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    comparePassword(candidatePassword: string): boolean {
        try {
            return bcrypt.compareSync(candidatePassword, this.password);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return false;
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            validate: {
                len: [6, 128]
            }
        },
        level: {
            type: new DataTypes.DECIMAL(10.2),
            allowNull: true,
            defaultValue: 0
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize
    }
);

const hashPassword = async (user: User) => {
    if (user.changed('password')) {
        const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
        user.password = hashedPassword;
    }
};

User.addHook('beforeCreate', hashPassword);
User.addHook('beforeUpdate', hashPassword);