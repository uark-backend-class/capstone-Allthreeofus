const router = require('express').Router();
const challengesController = require('../controllers/controller');

router.get('/', challengesController.home);
/* router.get('/add/:id', challengesController.addSolution);
router.post('/update/:id', challengesController.updateSolution);
router.get('/login', challengesController.authorize);
router.get(`/problem`, challengesController.problem)
*/
module.exports = router;