const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

//for showing to user
router.get('/investor', authController.investor_get);

//for fetching from webpage
router.post('/investor', authController.investor_post);

//for using in another file
module.exports = router;