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

      res.redirect('/');
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
      res.redirect('/login?error=incorrect-credentials');
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.redirect('/login?error=incorrect-credentials');
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.redirect('/');
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// // GET /logout for user logout
// router.get('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Session destruction error:', err);
//         return res.status(500).send('Could not log out, please try again.');
//       }
//       // Redirect to the home page or login page after successful logout
//       res.redirect('/login'); 
//     });
//   } else {
//     // If the user is not logged in, just redirect them
//     res.redirect('/login'); 
//   }
// });

module.exports = router;
