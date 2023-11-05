// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const expense = sequelize.define('expense',{
//     amount : { type : Sequelize.DOUBLE , allownull:false},
//     description : { type : Sequelize.STRING , allownull:false},
//     category : { type : Sequelize.STRING , allownull:false}
// })

// module.exports = expense;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amount: {
                type: Number,
                required: true   
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true 
            }
            
        
        
})

module.exports = mongoose.model('expenses', ExpenseSchema);