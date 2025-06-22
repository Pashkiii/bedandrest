import { DataTypes } from 'sequelize';
import { sequelize } from '../storage/base.js';

const LogModel = sequelize.define('log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
});

export { LogModel };
