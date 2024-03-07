const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

// POST a new comment for a playlist
router.post('/playlists/:playlistId/comments', async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            userId: req.session.userId, 
            playlistId: req.params.playlistId
        });
        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// GET all comments for a playlist
router.get('/playlists/:playlistId/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { playlistId: req.params.playlistId },
            include: [{ model: User, attributes: ['username'] }] 
        });
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve comments' });
    }
});

// DELETE a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        await Comment.destroy({
            where: { id: req.params.commentId }
        });
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;
