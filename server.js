const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); 

// Import route handlers
const homeRoutes = require('./routes/homeRoutes');


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
app.use('/', homeRoutes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
