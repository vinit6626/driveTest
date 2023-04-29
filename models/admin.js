// Vinit Mohanbhai Dabhi - 8804874
// mongoose import
const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
// // database connection
// mongoose.connect("mongodb+srv://vinit:vinit123@cluster0.orohzmx.mongodb.net/DriveTest?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Admin Schema Connection Successfull'))
// .catch((err) => {
//     console.error(err);
// });

const appointmentSchema = mongoose.Schema({
    date: {type:Date},
    time: {type:String},
    isTimeSlotAvailable:{type:Boolean, default:true},
})

// wrraped schema in model
const adminDataModel = mongoose.model("appointment", appointmentSchema);


module.exports = adminDataModel;