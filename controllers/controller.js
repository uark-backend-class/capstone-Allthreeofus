const axios = require('axios');
const db = require('../db');

module.exports = {
    home: async function (req, res) {
        res.render('home');
    },
}