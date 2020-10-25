const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const routes = require('./routes/routes');
const passport = require('passport');
const githubStrategy = require('passport-github2');
const bodyParser = require('body-parser');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(session({ 
  secret: 'trial and error',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use('/', routes);




passport.use(new githubStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL,
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(3000, () => {
  console.log("Server now running on port 3000");
});