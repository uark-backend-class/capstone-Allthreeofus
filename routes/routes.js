const router = require('express').Router();
const passport = require('passport');
const challengesController = require('../controllers/controller');

router.get('/', challengesController.home);
router.post('/add', challengesController.addSolution);
router.post('/update', challengesController.updateSolution);
router.get('/problem/:id', challengesController.problem);
router.get('/solution/:solution', challengesController.solution);
router.post('/delete/favorite', challengesController.deleteFavorite);
router.post('/delete/solution', challengesController.deleteSolution);
router.get('/login', challengesController.login);
router.get('/logout', challengesController.logout);
router.post('/favorite', challengesController.favorite);
router.get('/profile', challengesController.profile);

router.get('/login/callback', challengesController.loginCallBack, challengesController.loginRouteCallBack)

module.exports = router;