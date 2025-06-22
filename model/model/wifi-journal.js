import { DataTypes } from 'sequelize';
import { sequelize } from '../storage/base.js';
import { ApartmentModel } from './apartment.js';
import { BookingModel } from './booking.js';

export const WifiJournalModel = sequelize.define('wifi_journal', {
     id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    apartmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: ApartmentModel,
            key: 'id',
        }
    },
    bookingId: {
        type: DataTypes.INTEGER,
        references: {
            model: BookingModel,
            key: 'id',
        }
    },
    createDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    data: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
});
