const mongoose = require('mongoose')

const BreakfastFoodSchema = mongoose.Schema({
    Title : String,
    Description : String
});

const BreakfastFood = mongoose.model('breakfastfoods',BreakfastFoodSchema);

module.exports = BreakfastFood;