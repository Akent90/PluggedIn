const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playlist extends Model {}

Playlist.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true 
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mood: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    soundcloud_url: {
        type: DataTypes.STRING, 
        allowNull: false, 
        field: 'soundcloud_url',
        validate: {
            isUrl: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        }
    }
}, {
    sequelize, 
    timestamps: true, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'playlist'
});

module.exports = Playlist;