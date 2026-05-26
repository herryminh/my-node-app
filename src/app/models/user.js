const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema

const userAccount = new Schema({
  name: { type: String , required: true },
  userName: { type: String, required: true  },
  password: { type: String , required: true },
  phoneNumber: { type: String, required: true  },
  email: { type: String , required: true }
},{
  timestamps:true
})


module.exports = mongoose.model('User_account',userAccount);
