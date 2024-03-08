const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true,
        field: 'id' // This is typically the same in both the model and database, included here for consistency
    },
    content: {
        type: DataTypes.TEXT, 
        allowNull: false,
        field: 'content' // Matching the database field, included here for consistency
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },
        field: 'user_id' // Correctly maps the userId field to the user_id column in the database
    },
    playlistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'playlist',
            key: 'id',
        },
        field: 'playlist_id' // Correctly maps the playlistId field to the playlist_id column in the database
    }
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;
