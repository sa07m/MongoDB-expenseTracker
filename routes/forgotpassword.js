const express = require('express');
const forgotcontroller = require('../controllers/forgotcontroller');

const router = express.Router();

router.get('/forgotpassword',forgotcontroller.forgot);

router.post('/password/forgotpassword',forgotcontroller.forgotpassword)

router.get('/password/resetpassword/:uuid',forgotcontroller.resetpassword)

router.post('/password/update' , forgotcontroller.updatepassword)




module.exports = router ;