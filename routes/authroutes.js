const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.home);
router.get('/loginpage', authController.loginpage)

router.post('/signup', authController.signup)

router.post('/login', authController.login)

module.exports = router;