const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    updateTime: String,
    alza: [{
        name: String,
        originalPrice: Number,
        currentPrice: Number,
        sale: String,
        Description: String,
        link: String,
        img: String
    }],
    czc: [{
        name: String,
        originalPrice: Number,
        currentPrice: Number,
        sale: String,
        Description: String,
        link: String,
        img: String
    }],
    mall: [{
        name: String,
        originalPrice: Number,
        currentPrice: Number,
        sale: String,
        Description: String,
        link: String,
        img: String
    }]
});

module.exports = mongoose.model('Sales', SaleSchema);