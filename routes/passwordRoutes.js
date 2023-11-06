const express = require('express');
const passwordController = require('../controllers/passwordController');

const router = express.Router();

router.get('/forgotpassword', passwordController.forgot);

router.post('/password/forgotpassword', passwordController.forgotpassword)

router.get('/password/resetpassword/:uuid', passwordController.resetpassword)

router.post('/password/update', passwordController.updatepassword)




module.exports = router;