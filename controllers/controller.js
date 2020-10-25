const axios = require('axios');
const db = require('../db');
const session = require('express-session');
const passport = require('passport');

let user = undefined;

module.exports = {
    favorite: async function(req, res){
        console.log(req.params);
        let numFavorites = await db.Favorite.count({where : {'username' : req.params.username}})
        await db.Favorite.upsert({num: numFavorites + 1, username: req.params.username, problemID: req.params.id});
        res.send('<p>some html</p>');
    },
    home: async function (req, res) {
        let problem = await db.Problem.findAll({raw: true});
        if (req.user){
            db.User.upsert({username: req.user.username});
            user = await db.User.findAll({where: {username: req.user.username}, raw: true});
        }
        res.render('home', {problem, user});
    },

    profile: async function (req,res) {
        let favorites = await db.Favorite.findAll({where: {username: user[0].username}});
        res.render('profile', {user, favorites});
    },
    
    addSolution: async function (req, res) {
        let solution = await db.Solution.upsert(req.body);
        res.render('profile', { user, solution});
    },
    
    updateSolution: async function (req, res) {
        let solution = await db.Solution.upsert(req.body);
        res.render('profile', {user, solution});
    },

    deleteSolution: async function (req, res) {
        solution = await db.Solution.delete(req.body.id);
        res.render('profile', {user, solution});
    },

    problem: async function (req, res) {
        let problem = await db.Problem.findByPk(req.params.id, {raw: true});
        let solution = await db.Solution.findAll({where: {name: req.params.id}, raw: true});
        res.render('problem', {problem, user, solution});
    },
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
      
        res.status(401).send();
      },
    login: passport.authenticate("github", { scope: ["user:email"] }),
    loginCallBack: passport.authenticate('github', { failureRedirect: '/login'}),
    logout: function(req, res){
        req.logout();
        res.redirect('/');
      },
} 