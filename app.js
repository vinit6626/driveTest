// Vinit Mohanbhai Dabhi - 8804874

const express = require('express');
var session = require('express-session');
var cookieSession = require('cookie-session');

const userDataModel = require('./models/db.js');     
const route = require('./routes/web.js');           
const http = require('http')
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1) 


app.use(session({
    secret : "A secret Key to Sign the Cookie",
    resave : false ,
    saveUninitialized : true 
 }))

app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3001, () => {
    console.log("app is running on 3001")
})

app.use('/driveTest',route);