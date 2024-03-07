const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Import SequelizeStore
const sequelize = require('./config/connection'); 

// Import route handlers
const apiRoutes = require('./controllers/api');
const webRoutes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session with SequelizeStore
const sess = {
    secret: 'ADD KEY HERE',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

// Middleware for session
app.use(session(sess));

// Handlebars setup
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

// Middleware for JSON and url-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/api', apiRoutes); // API routes
app.use('/', webRoutes);     // View routes

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
