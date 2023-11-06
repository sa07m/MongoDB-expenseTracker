const express = require('express');
const authmiddleware = require('../middleware/authMiddleware')
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

router.get('/purchase/premium', authmiddleware.authenticate, purchaseController.purchasepremium);

router.post('/purchase/updatetransactionstatus', authmiddleware.authenticate, purchaseController.updatetransactionstatus);

module.exports = router;