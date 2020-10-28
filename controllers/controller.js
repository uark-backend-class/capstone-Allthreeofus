const axios = require('axios');
const db = require('../db');
const session = require('express-session');
const passport = require('passport');

let user = undefined;

module.exports = {
    favorite: async function(req, res){
        let favorites = await db.Favorite.findAll({where: {favoriteUser: user.username, problemID: req.body.id}, raw: true});
        if (favorites[0] == undefined){
        let solution = await db.Solution.findAll({where: {id: req.body.id}, raw: true});
        let info = {username: solution[0].username, problemID: solution[0].id, 
            name: solution[0].name, solutionName: solution[0].solutionName, data: solution[0].data, favoriteUser: user.username, authorized: solution[0].authorized};
        await db.Favorite.upsert(info);
        }
        res.redirect('back');
    },
    home: async function (req, res) {
        let problem = await db.Problem.findAll({raw: true});
        res.render('home', {problem, user});
    },

    profile: async function (req,res) {
        if (user){
            let favorites = await db.Favorite.findAll({where: {favoriteUser: user.username}, raw: true});
            let submittedSolutions= await db.Solution.findAll({where: {username: user.username}, raw: true});
            let favoriteData = "";
            let administrator = await db.User.findByPk(user.username, {raw: true});
            if (administrator.admin){
                var approveList = await db.Solution.findAll({where: {authorized: false}, raw: true})
            }
            console.log(administrator);
            res.render('profile', {user, favorites, submittedSolutions, favoriteData, administrator, approveList});
        }
        else {
            res.redirect('/');
        }
    },
    
    addSolution: async function (req, res) {
        let result = req.body;
        console.log(result);
        let solution = undefined;
        if (result.id){
            solution = await db.Solution.findByPk(result.id, {raw: true});
            console.log(solution);
        }
        else {
            solution = result;
        }
        res.render('addSolution', { user, solution });
    },
    
    updateSolution: async function (req, res) {
        if(req.body.auth){
            let auth = await db.Solution.findByPk(req.body.auth, {raw: true})
            auth.authorized = !auth.authorized;
            await db.Solution.upsert(auth);
            res.redirect('back');
        }
        else{
            let solution = req.body;
            let problem = {name: solution.name};
            console.log(solution);
            await db.Solution.upsert(solution);
            res.redirect('/');
        }
        
    },

    deleteFavorite: async function (req, res) {
        await db.Favorite.destroy({where: {favoriteUser: user.username, problemID: req.body.id}});
        res.redirect('back');
    },

    deleteSolution: async function (req, res) {
        await db.Solution.destroy({where: {favoriteUser: user.username, problemID: req.body.id}});
        res.redirect('back');
    },

    solution: async function (req, res) {
        let solution = await db.Solution.findByPk(req.params.solution, {raw: true});
        if (user){
            var favorited = await db.Favorite.findAll({where: {favoriteUser: user.username, problemID: req.params.solution}, raw: true});
            var administrator = await db.User.findByPk(user.username, {raw: true});
            var sameUser = (user.username == solution.username);
            var favored = favorited[0];
        }
        else {
            favorited = undefined;
            administrator = undefined;
            sameUser = undefined;
            favored = undefined;
        }
        res.render('solutions', { solution, user, favored, administrator, sameUser });
    },

    problem: async function (req, res) {
        let problem = await db.Problem.findByPk(req.params.id, {raw: true});
        let solution = await db.Solution.findAll({where: {name: req.params.id}, raw: true});
        if (user){
            var admin = await db.User.findByPk(user.username, {raw: true});
        }
        else{ admin = undefined };
        res.render('problem', {problem, user, solution, admin});
    },
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
      
        res.status(401).send();
      },
    login: passport.authenticate("github", { scope: ["user:email"] }),
    loginCallBack: passport.authenticate('github', { failureRedirect: '/login'}),
    loginRouteCallBack:async function(req,res){
        user = req.user;
        await db.User.upsert(user);
        res.redirect('back');
    },
    logout: function(req, res){
        req.logout();
        user = undefined;
        res.redirect('back');
      },
} 