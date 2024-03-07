const express = require('express');
const router = express.Router();

// Import controllers
const homeRoutes = require('./homeRoutes');
const commentController = require('./commentController');
const likeController = require('./likeController');

// Mount routes
router.use('/', homeRoutes);
router.use('/comments', commentController);
router.use('/likes', likeController);

module.exports = router;