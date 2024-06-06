const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Product", ProductSchema);