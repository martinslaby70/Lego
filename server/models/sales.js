const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SaleSchema = new Schema({
    updateTime: String,
    itemsCount: Number,
    salesCount: Number,
    sales: [{
        name: String,
        originalPrice: String,
        currentPrice: String,
        sale: String,
        Description: String,
        link: String,
        img: String,
        seller: String
    }],
});

module.exports = mongoose.model('Sales', SaleSchema);