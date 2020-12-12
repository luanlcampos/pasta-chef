//use dotenv to include env variables .env
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//setting the userSchema
var userSchema = new Schema({
    "userName": {
        "type": String,
        "unique": true
    },
    "password": String,
    "email": {
        type: String,
        unique: true
    },
    admin: Boolean   
});



db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})