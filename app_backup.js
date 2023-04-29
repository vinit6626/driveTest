const express = require('express');
const http = require('http')
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose import
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// database connection
mongoose.connect("mongodb+srv://vinit:Vinit123@cluster0.orohzmx.mongodb.net/DriveTest?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}, (error) =>{
    if(error){
        console.log("----- Database not connected due to error below ----");
        console.log(error);

    }else{
        console.log("**** MongoDB connected successfully ****");
    }
});

// create table/schema
const userDataSchema = mongoose.Schema({
    fName: String,
    lName: String, 
    email: String,
    age: String,
    dob: String,
    license: String,
    carCompany: String,
    carModel: String,
    plateNumber: String, 
    carYear: String
})

// wrraped schema in model
const userDataModel = mongoose.model("userData", userDataSchema);

// in post request we get data from user and insert into database
app.post('/adddata',(req, res)=>{
    const form_data = req.body;
   
    userDataModel.create({
        fName: form_data.fName,
        lName: form_data.lName, 
        email: form_data.email,
        age: form_data.age,
        dob: form_data.dob,
        license: form_data.license,
        carCompany: form_data.carCompany,
        carModel: form_data.carModel,
        plateNumber: form_data.plateNumber, 
        carYear: form_data.carYear
    },(error,userData_inserted)=>{
        if(error){
            console.log("---Sorry data is not added to DB due to error Below -----");
            console.log(error);
        }else{
            console.log("*** Book added successfully to DB***");
            console.log(userData_inserted);
            // res.send(userData_inserted);
        }
    })
})

app.listen(3001,()=>{
    console.log("app is running on 3001")
})

app.get('/home',(req,res)=>{
    res.render("index",{"heading": "Dashboard"})
})

app.get('/login',(req,res)=>{
    res.render("login",{"heading": "Login"});
})

app.get('/g2',(req,res)=>{
    res.render('g2',{"heading":"G2 Test"});
})
app.get('/g',(rew,res)=>{
    res.render('g',{"heading": "G Test"})
})