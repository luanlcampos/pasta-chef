//heroku link: https://protected-wildwood-92195.herokuapp.com/ -> git push heroku master
//github repo: https://github.com/luanlcampos/pasta-chef -> git push origin master

const express = require("express");
var path = require("path");
const exphbs = require("express-handlebars");
var data = require("./models/user-data") //requiring all functions from data-service.js
var clientSessions = require("client-sessions");
//var multer = require("multer"); //deal with images
var bodyParser = require("body-parser"); //deal with forms


var app = express();



app.use(express.static('public')); //set the public dir as static

//setting client-session
app.use(clientSessions({
    cookieName: "session",  // cookie name dictates the key name added to the request object
    secret: "pastachef", //long and unguessable string
    duration: 2 * 60 * 1000, //2 mintues duration in ms
    activeDuration: 1000 * 60 //session extension by each request
}))
//templates will have access to a session object = {{session.userName}}
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
    });


//set body parser
app.use(bodyParser.urlencoded({ extended: true }))

//helper middleware function to ensureLogin. if user is not logged in, redirect to the login page
ensureLogin = (req, res, next) => {
    console.log(req.session.user);
    if(!req.session.user){
        res.redirect("/login");
    }
    else {
        next();
    }
}

//set the app to use handlebars template
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'views'))); //set the views dir as static


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

app.get("/menu", ensureLogin, (req, res) => {
    res.render("menu");
})

app.get("/logout", (req, res) => l{
    req.session.reset();
    res.redirect("/");
})



// ** POST ROUTES ** 
app.post("/login", (req, res)=> {
    //req.body.userAgent = req.get('User-Agent');
    console.log(req.body)
    data.checkUser(req.body)
    .then((userData)=>{
        req.session.user = userData;
        res.redirect("/");

    }).catch((err)=>{
        res.render("login", {errorMsg: err, email: req.body.email})
    })
})

app.post("/register", (req, res)=>{
    console.log(req.body);
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