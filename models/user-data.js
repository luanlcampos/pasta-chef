//use dotenv to include env variables .env
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//setting the userSchema
var userSchema = new Schema({
    name: String,
    userName: {
        "type": String,
        "unique": true
    },
    password: String,
    email: {
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


module.exports.userRegistration = (userData) => {
    console.log(userData);
    return new Promise ((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userData.password, salt, (err, hash) => {
                if (err) {
                    reject("There was an error encrypting the password");
                }
                else {
                    userData.password = hash;
                    userData.admin = false;
                    let newUser = new Users(userData);
                    newUser.save()
                    .then(()=>{
                        resolve("User added");
                    })
                    .catch((err)=>{
                        if (err.code === 11000) {
                            reject ("Username already taken");
                        }
                        else {
                            reject(`There was an error creating the user: ${err}`);
                        }
                    })
                }
            })
        })
    })
}

module.exports.checkUser = (userData) => {
    return new Promise((resolve, reject)=> {
        Users.find({email: userData.email})
        .then((user) =>{
            bcrypt.compare(userData.password, user[0].password)
            .then((res)=>{
                if (res === true) {
                        resolve(users[0]);
                }
            }).catch((err)=>{
                reject(`Unable to find user: ${userData.email}`);
            })
        }).catch((err)=>{
            reject(`Unable to find user: ${userData.email}`);
    })
})}

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


