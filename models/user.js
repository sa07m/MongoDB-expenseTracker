// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('user' , {
//     id : {type : Sequelize.INTEGER , autoIncrement : true, allowNull:false , primaryKey : true },
//     name : Sequelize.STRING,
//     email : {type : Sequelize.STRING , allowNull:false , unique : true },
//     password : Sequelize.STRING ,
//     ispremiumuser : Sequelize.BOOLEAN,
//     totalexpenses : {type: Sequelize.INTEGER  ,  defaultValue : 0 }
// });


// module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    ispremiumuser: {
        type: Boolean,
        default: false
    },

    totalexpenses: {
        type: Number,
        //default:0
    }

})

module.exports = mongoose.model('User', userSchema);