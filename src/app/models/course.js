const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
  ten_san_pham: { type: String },
  don_gia: { type: String },
  don_vi: { type: String },
  trang_thai: { type: String },
  slug: { type: String, slug: 'ten_san_pham', unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', Course);
