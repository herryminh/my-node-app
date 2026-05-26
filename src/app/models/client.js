const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);
const Schema = mongoose.Schema

const client = new Schema({
  name: { type: String , required: true },
  email: { type: String},
  phone: { type: String },
  address: { type: String, required: true  }
},{
  timestamps:true
})


module.exports = mongoose.model('Client',client);