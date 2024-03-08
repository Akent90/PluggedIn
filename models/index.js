const User = require('./User');
const Playlist = require('./Playlist');
const Comment = require('./Comment');
const Likes = require('./Likes');

// User to Playlist Associations
User.hasMany(Playlist, {
    foreignKey: 'userId',
    as: 'playlists'
});
Playlist.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Playlist to Comment Associations
Playlist.hasMany(Comment, {
    foreignKey: 'playlistId',
    as: 'comments'
});
Comment.belongsTo(Playlist, {
    foreignKey: 'playlistId', 
    as: 'playlist'
});

// User to Comment Association (Direct association between User and Comment)
User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'userComments'
});
Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
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
