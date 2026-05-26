const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
mongoose.plugin(slug);

const Schema = mongoose.Schema


const bill = new Schema({
    pharmacyName: { type: String, required: true }, 
    pharmacyAddress: { type: String}, 
    customerPhone: { type: String },
    products: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            total: { type: Number, required: true }
        }
    ],
    giftProducts: [
        {
            name: { type: String },
            quantity: { type: Number },
            price: { type: Number},
            total: { type: Number}
        }
    ],
    totalAmount: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', bill);