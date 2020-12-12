//heroku link: https://protected-wildwood-92195.herokuapp.com/ -> git push heroku master
//github repo: https://github.com/luanlcampos/pasta-chef -> git push origin master

const express = require("express");
var path = require("path");
const exphbs = require("express-handlebars");
var data = require("./models/user-data") //requiring all functions from data-service.js
//var clientSessions = require("client-sessions");
//var multer = require("multer"); //deal with images
//var bodyParser = require("body-parser"); //deal with forms


var app = express();



app.use(express.static('public')); //set the public dir as static

//set the app to use handlebars template
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'views'))); //set the views dir as static
//app.use(bodyParser.urlencoded({ extended: true })); //setting bodyParser


var HTTP_PORT = process.env.PORT || 8080;


// *** GET ROUTES ***
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/menu", (req, res) => {
    res.render("menu");
})



// ** POST ROUTES ** 
app.post("/login", (req, res)=> {
    
})

app.post("/register", (req, res)=>{
    data.userRegistration(req.body)
    .then(()=>{
        res.render("home", {successMessage: "User Created"})
    })
    .catch((err)=>{
        res.render("home", {errorMsg: err, email: req.body.email})
    })
})



data.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Express http server listening on port http://localhost:" + HTTP_PORT);
        })
    }).catch ((err) => {
    console.log(err);
})


// app.listen(HTTP_PORT, () => {
//     console.log("Express http server listening on port http://localhost:" + HTTP_PORT)
// })