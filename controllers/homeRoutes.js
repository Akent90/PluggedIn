const express = require('express');
const router = express.Router();
const { Playlist, Comment, Likes, User } = require('../models');
const withAuth = require('../utils/auth'); 

// GET home page with mood-based playlists
router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch playlists and categorize them based on mood
        const playlistData = await Playlist.findAll({
            attributes: ['id', 'title', 'mood', 'description'],
            order: [['mood', 'ASC']] // Sort by mood
        });

        // Serialize the playlist data
        const playlists = playlistData.map(playlist => playlist.get({ plain: true }));

        // Organize playlists by mood
        const moods = {};
        playlists.forEach(playlist => {
            if (!moods[playlist.mood]) {
                moods[playlist.mood] = [];
            }
            moods[playlist.mood].push(playlist);
        });

        // Render the homepage with playlists grouped by mood
        res.render('homepage', {
            moods,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// GET playlist by mood
router.get('/playlists/:mood', withAuth, async (req, res) => {
    try {
        const mood = req.params.mood;
        const playlistData = await Playlist.findAll({
            where: { mood: mood },
            include: [
                { 
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            attributes: ['username'] 
                        }
                    ]
                },
                { 
                    model: Likes,
                    as: 'likes',
                    // Space to include additional user information for likes, add another include here
                },
                {
                    model: User,
                    attributes: ['username'], 
                    as: 'user'
                }
            ]
        });

        const playlists = playlistData.map(playlist => playlist.get({ plain: true }));

        // Render a view for the specific mood, passing in the playlists for that mood
        res.render('mood-playlist', { 
            playlists,
            mood,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
