const express = require('express');
const authcontroller = require('../controllers/authcontroller');

const router = express.Router();

router.get('/',authcontroller.home);
router.get('/loginpage', authcontroller.loginpage )

router.post('/signup',authcontroller.signup)

router.post('/login',authcontroller.login)

module.exports = router ;