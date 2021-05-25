const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

//for showing to user
router.get('/',authController.home_get);
router.get('/investor', authController.investor_get);
router.get('*', function(req, res){ res.status(404).render('404'); });

//for fetching from webpage
router.post('/investor', authController.investor_post);

//for using in another file
module.exports = router;