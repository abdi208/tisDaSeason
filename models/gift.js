const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
    name: String,
    price: Number,
    
})

module.exports = mongoose.model('Gift', giftSchema)