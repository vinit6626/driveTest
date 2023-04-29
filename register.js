// create User Registration table/schema
const registerDataSchema = mongoose.Schema({ 
    email: String,
    password: String,
    dob: String,
    mobile: String
})

// wrraped schema in model
const registerDataModel = mongoose.model("register", registerDataSchema);


module.exports = registerDataModel;





app.post('/register_user',(req, res)=>{
    const form_data = req.body;
   
    registerDataModel.create({
        email: form_data.email,
        password: form_data.license,
        mobile: form_data.mobile,
        dob: form_data.dob
    },(error,registerData_inserted)=>{
        if(error){
            console.log("---Sorry Register data is not added to DB due to error Below -----");
            console.log(error);
        }else{
            console.log("*** Register data added successfully to DB***");
            console.log(registerData_inserted);
            res.render('login');
            // res.send(userData_inserted);
        }
    })
})
