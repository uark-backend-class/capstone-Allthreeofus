const dotenv = require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const routes = require('./routes/routes');

const app = express();
app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(3000, () => {
  console.log("Server now running on port 3000");
});