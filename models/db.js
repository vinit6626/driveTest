//  Vinit Mohanbhai Dabhi - 8804874

// mongoose import
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// database connection
mongoose.connect("mongodb+srv://vinit:vinit123@cluster0.orohzmx.mongodb.net/DriveTest?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('DB Connection Successfull'))
.catch((err) => {
    console.error(err);
});


// create table/schema
const userDataSchema = mongoose.Schema({
    fName: {type: String, default: 'default'},
    lName:  {type: String, default: 'default'}, 
    email:  {type: String, default: 'demo', unique:true},
    age:  {type: String, default: '0'},
    password: {type: String, default: 'demo'},
    userType: {type: String},
    dob:  {type: String, default: '0'},
    license:  {type: String, default: 'default'},
    carCompany:  {type: String, default: 'default'},
    carModel:  {type: String, default: 'default'},
    plateNumber:  {type: String, default: 'default'}, 
    carYear:  {type: String, default: '0'},
    appointment_date: {type: String, default: 'default'},
    appointment_time: {type: String, default: 'default'},
    exam_type: {type: String, default: 'default'},
    result:{type:String, default: 'default'},
    comment:{type:String, default: 'default'},
    vendor:{type:Boolean, default: 'false'}

})

// wrraped schema in model
const userDataModel = mongoose.model("userData", userDataSchema);


module.exports = userDataModel;

