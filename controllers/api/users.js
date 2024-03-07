const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// POST /api/users for user registration
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10), // Hashes the password before saving
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /api/users/login for user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST /api/users/logout for user logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
