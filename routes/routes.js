const router = require('express').Router();
const passport = require('passport');
const challengesController = require('../controllers/controller');

router.get('/', challengesController.home);
router.post('/add', challengesController.addSolution);
router.post('/update', challengesController.updateSolution);
router.get('/problem/:id', challengesController.problem)
router.get('/delete', challengesController.deleteSolution);
router.get('/login', challengesController.login);
router.get('/logout', challengesController.logout);
router.get('/favorite/:id&&:username', challengesController.favorite);
router.get('/profile/:id', challengesController.profile);

router.get('/login/callback', challengesController.loginCallBack, (req, res) => {  res.redirect('/') })

module.exports = router;