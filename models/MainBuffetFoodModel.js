const mongoose = require('mongoose')

const MainBuffetFoodSchema = mongoose.Schema({
    Title : String,
    Description : String
});

const MainBuffetFood = mongoose.model('mainbuffetfoods',MainBuffetFoodSchema);

module.exports = MainBuffetFood;