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


//setting meal schema
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

let Users;
let Meals;

module.exports.initialize = () => {
    return new Promise ((resolve, reject)=>{
        let db = mongoose.createConnection("mongodb+srv://web322a6:web322a6@web322-a6.2zg0w.mongodb.net/pasta-chef?retryWrites=true&w=majority");
        db.on('error', (err) => {
            reject(err);  // reject the promise with the provided error
        });
        db.once('open', ()=> {
            Users = db.model("users", userSchema);
            Meals = db.model("meals", mealSchema);
            console.log("Database Connected!")
            resolve();
        })

    })
}


// module.exports.testData = () => {
//     return new Promise ((resolve, reject)=>{
//         var testUser = new Users ({
//             username: "llima-campos",
//             password: "12345678",
//             email: "luan@email.com",
//             admin: true
//         });
        
//         testUser.save((err)=>{
//             if(err){
//                 reject(err);
//             }
//             else {
//                 resolve("Data added");
//             }
//         })
//     })
// }


