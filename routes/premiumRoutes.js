const express = require('express');
const authmiddleware = require('../middleware/authMiddleware')
const premiumController = require('../controllers/premiumController');

const router = express.Router();

router.get('/premium/showleaderboard', authmiddleware.authenticate, premiumController.showleaderboard);
router.get('/user/download', authmiddleware.authenticate, authmiddleware.checkpremium, premiumController.download);

module.exports = router;