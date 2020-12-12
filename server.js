const express = require("express");
var path = require("path");
const exphbs = require("express-handlebars");
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
app.get("/", (req, res) =>{
    res.render("home");
})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/menu", (req, res)=>{
    res.render("menu");
})



app.listen(HTTP_PORT, () => {
    console.log("Express http server listening on port http://localhost:" + HTTP_PORT)
})