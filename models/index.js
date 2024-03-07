const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Playlist, {
    foreignKey: 'userId',
    as: 'playlists'
});
Playlist.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Playlist.hasMany(Comment, {
    foreignKey: 'playlistId',
    as: 'comments'
});
Comment.belongsTo(Playlist, {
    foreignKey: 'playlistId', 
    as: 'playlist'
});

Playlist.hasMany(Likes, {
    foreignKey: 'playlistId',
    as: 'likes'
});
Likes.belongsTo(Playlist, {
    foreignKey: 'playlistId', 
    as: 'playlist'
});

module.exports = { User, Playlist, Comment, Likes };