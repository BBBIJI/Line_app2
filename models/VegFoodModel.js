const mongoose = require('mongoose')

const VegFoodSchema = mongoose.Schema({
    Title : String,
    Description : String
});

const VegFood = mongoose.model('vegfoods',VegFoodSchema);

module.exports = VegFood;