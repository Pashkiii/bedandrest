import { DataTypes } from 'sequelize';
import { sequelize } from '../storage/base.js';

const ApartmentModel = sequelize.define('apartment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    address: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    /** @deprecated */
    ads: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    linens: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    inHour: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    outHour: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deposit: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    thingsLink: {
        type: DataTypes.STRING,
        allowNull: true,
        default: '',
    },
    archive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    mapPoint: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export { ApartmentModel };
