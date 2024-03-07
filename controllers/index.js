const express = require('express');
const router = express.Router();

// Import controllers
const homeRoutes = require('./homeRoutes');
const commentController = require('./comment');
const likeController = require('./like');

// Mount routes
router.use('/', homeRoutes);
router.use('/comments', commentController);
router.use('/likes', likeController);

module.exports = router;