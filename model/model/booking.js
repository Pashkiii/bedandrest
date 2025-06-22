import { DataTypes } from 'sequelize';
import { sequelize } from '../storage/base.js';

const BookingModel = sequelize.define('booking', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    beginDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    clientId: {
        type: DataTypes.INTEGER
    },
    clientName: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    apartmentId: {
        type: DataTypes.INTEGER,
    },
    phone: {
        type: DataTypes.STRING,
    },
    data: {
        type: DataTypes.JSON,
        default: ''
    },
    createDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    firstMessageSended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    secondMessageSended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export { BookingModel };
