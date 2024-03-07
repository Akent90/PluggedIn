const express = require('express');
const router = express.Router();
const { Likes } = require('../models');

// POST a new like for a playlist
router.post('/playlists/:playlistId/likes', async (req, res) => {
    try {
        const newLike = await Likes.create({
            userId: req.session.userId, 
            playlistId: req.params.playlistId
        });
        res.status(201).json(newLike);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add like' });
    }
});

module.exports = router;
