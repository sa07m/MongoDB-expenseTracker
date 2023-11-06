const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.get('/app', expenseController.app);


router.post('/expenses', authMiddleware.authenticate, expenseController.postExpense);

router.get('/expenses', authMiddleware.authenticate, expenseController.getExpense);

router.delete('/deleteexpense/:id', authMiddleware.authenticate, expenseController.deleteExpense);

module.exports = router;