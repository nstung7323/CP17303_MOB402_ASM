const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    },
    nameUser: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);