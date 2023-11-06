const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
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

module.exports = mongoose.model('password', passwordSchema);

