// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const forGotPassword = sequelize.define("forgotPasswordRequests", {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     uuid: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     isActive: {
//       type: Sequelize.BOOLEAN,
//       allowNull: false,
//       defaultValue: 1,
//     },
//   });


// module.exports = forGotPassword;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForgotpasswordSchema = new Schema({
  uuid: {
    type: String,  // change data type to String
    required: true,
  },

  isActive: {
    type: Boolean,
    required: true
  },
  
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

module.exports = mongoose.model('forgotpassword', ForgotpasswordSchema);

