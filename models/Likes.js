const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Likes extends Model {}

Likes.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'user', 
            key: 'id',
        }
    },
    playlistId: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: 'playlist',
            key: 'id',
        }
    }
}, {
    sequelize, 
    timestamps: true, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'likes'
});

module.exports = Likes;