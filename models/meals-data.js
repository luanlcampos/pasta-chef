//use dotenv to include env variables .env
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var mealSchema = new Schema ({
    image: String,
    title: String,
    ingredients: String,
    desc: String,
    category: String,
    price: Number,
    cookTime: Number,
    cal: Number,
    topMeal: Boolean
});