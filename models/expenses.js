const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const expense = sequelize.define('expense',{
    amount : { type : Sequelize.DOUBLE , allownull:false},
    description : { type : Sequelize.STRING , allownull:false},
    category : { type : Sequelize.STRING , allownull:false}
})

module.exports = expense;