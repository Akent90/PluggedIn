const express = require('express');
const router = express.Router();
const { Playlist, Comment, Likes, User } = require('../models');
const withAuth = require('../middleware/withAuth');

// GET home page with mood-based playlists
router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch playlists and categorize them based on mood
        const playlistData = await Playlist.findAll({
            attributes: ['id', 'title', 'mood', 'description', 'soundcloud_url'], // Corrected attribute name
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

// GET login page
router.get('/login', (req, res) => {
    res.render('login'); 
});

// GET signup page
router.get('/signup', (req, res) => {
    res.render('signup'); 
});

// GET /logout for user logout
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(err => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).send('Could not log out, please try again.');
            }
            // Redirect to the home page or login page after successful logout
            res.redirect('/login'); 
        });
    } else {
        // If the user is not logged in, just redirect them
        res.redirect('/login'); 
    }
});

// // GET all playlists or a specific instruction page
// router.get('/playlists/', withAuth, async (req, res) => {
//     try {
//         // Fetch all playlists, or render a specific view that guides the user on what to do next
//         const playlistData = await Playlist.findAll({
//             attributes: ['id', 'title', 'mood', 'description', 'soundcloud_url'],
//             order: [['mood', 'ASC']]
//         });

//         const playlists = playlistData.map(playlist => playlist.get({ plain: true }));

//         // You could render a page that lists all playlists, or redirects to a mood selection page
//         res.render('all-playlists', {
//             playlists,
//             loggedIn: req.session.loggedIn
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });


module.exports = router;

