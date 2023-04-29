// Vinit Mohanbhai Dabhi - 8804874

const userDataModel = require('../models/db.js');
const adminDataModel = require('../models/admin.js');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');

class DriveTestController {
    static dashboardController = async (req, res) => {
        if (req.session.userType == "Admin" && req.session.selectedType == req.session.userType) {
            if (req.session.userEmail) {
                req.session.visible = "";
                req.session.notVisible = "none";
                res.render('index.ejs', { name: req.session.userEmail, color: "black", admin: req.session.visible, driver: req.session.notVisible, examiner:req.session.notVisible, notVisible: req.session.notVisible, visible: req.session.visible });
            } else {
                res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        } else if (req.session.userType == "Driver" && req.session.selectedType == req.session.userType) {
            if (req.session.userEmail) {
                res.render('index.ejs', { name: req.session.userEmail, color: "black", driver: req.session.visible, admin: req.session.notVisible, notVisible: req.session.notVisible, visible: req.session.visible, examiner:req.session.notVisible });
            } else {
                res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        } if (req.session.userType == "Examiner" && req.session.selectedType == req.session.userType) {
            if (req.session.userEmail) {
                req.session.visible = "";
                req.session.notVisible = "none";
                res.render('index.ejs', { name: req.session.userEmail, color: "black", admin: req.session.notVisible, driver: req.session.notVisible, examiner:req.session.visible, notVisible: req.session.notVisible, visible: req.session.visible });
            } else {
                res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        }else if(req.session.userType == undefined){
                res.render('index.ejs', { name: req.session.userEmail, color: "black", driver: "none", admin: "none", notVisible: "", visible: "none", examiner: "none" });
        }else{
            res.render('login.ejs', { msg: "Please Select Valid User Type", color: "black", visible: "none", notVisible: "" });
        }
    }

    static adminAppointmentController = async (req, res) => {
        if (req.session.userType == "Admin") {
            if (req.session.userEmail) {
                req.session.visible = "";
                req.session.notVisible = "none";
                res.render('appointment.ejs', { msg: "", color: "white", visible: req.session.visible, notVisible: req.session.notVisible });
            } else {
                res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        } else {
            res.render('login.ejs', { msg: "", color: "white", notVisible: "", visible: "none" });
        }

    }

    static loginController = (req, res) => {
        req.session.selectedType = "hello";
        if (req.session.visible == "") {
            req.session.visible = "";
            req.session.notVisible = "none";
        } else {
            req.session.visible = "none";
            req.session.notVisible = "";
        }
        res.render('login.ejs', { msg: "", color: "white", notVisible: "", visible: "none" });
    }

    static logoutController = (req, res) => {
        req.session.destroy(console.log("session destroyed"));

        const visible = "none";
        const notVisible = "";
        res.render('login.ejs', { msg: "Thank you, Login to access our service.", color: "green", notVisible: notVisible, visible: visible });
    }

    static g2Controller = async (req, res) => {
        if (req.session.userType == "Driver") {
            const userInfo = await userDataModel.findOne({ email: req.session.userEmail });
            res.render("g2.ejs", { details: userInfo, notVisible: req.session.notVisible, visible: req.session.visible });
        } else {
            res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: "", visible: "none" });
        }
    }

    static gController = async (req, res) => {
        if (req.session.userType == "Driver") {
            if (req.session.userEmail) {
                const userInfo = await userDataModel.findOne({ email: req.session.userEmail });
                console.log(userInfo)
                res.render('g.ejs', { details: userInfo, notVisible: req.session.notVisible, visible: req.session.visible });
            } else {
                res.render('login.ejs', { msg: "User Not Found", color: "white", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        } else {
            res.render('login.ejs', { msg: "", color: "white", notVisible: "", visible: "none" });
        }

    }

    static addDataController = async (req, res) => {
        const id_from_action_attribute = req.params.id;
        const updated_license_in_edit_ejs = req.body;
        const hashLicense = await bcrypt.hash(updated_license_in_edit_ejs.license, 10);


        userDataModel.findByIdAndUpdate(id_from_action_attribute, {
            fName: updated_license_in_edit_ejs.fName,
            lName: updated_license_in_edit_ejs.lName,
            email: updated_license_in_edit_ejs.email,
            age: updated_license_in_edit_ejs.age,
            dob: updated_license_in_edit_ejs.dob,
            license: hashLicense,
            carCompany: updated_license_in_edit_ejs.carCompany,
            carModel: updated_license_in_edit_ejs.carModel,
            plateNumber: updated_license_in_edit_ejs.plateNumber,
            carYear: updated_license_in_edit_ejs.carYear,
            appointment_date : "default",
            appointment_time : "default"
        }, (error, license_details_updated_in_db) => {
            if (error) {
                console.log(error);
            } else {
                console.log(license_details_updated_in_db);
                res.redirect("/driveTest/g");
            }
        })
    }

    static getG2DataController = async (req, res) => {
        const license_number = req.body.staticLNumber;
        const hashLicense = await bcrypt.hash(license_number, 10);

        userDataModel.find({ license: license_number }, (error, user_g2_data) => {
            if (error) {
                console.log(error);
            } else {
                if (user_g2_data.length >= 1) {

                    res.render("update.ejs", { "display": "block", details: user_g2_data, notVisible: req.session.notVisible, visible: req.session.visible });

                } else {
                    res.render('g', { errormsg: "User Not Found!", color: "red", notVisible: req.session.notVisible, visible: req.session.visible })
                }
            }
        })
    }

    static updateCarInfoController = async (req, res) => {
        const id_from_action_attribute = req.params.id;
        const updated_license_in_edit_ejs = req.body;

        userDataModel.findByIdAndUpdate(id_from_action_attribute, {
            fName: updated_license_in_edit_ejs.fName,
            lName: updated_license_in_edit_ejs.lName,
            email: updated_license_in_edit_ejs.email,
            age: updated_license_in_edit_ejs.age,
            dob: updated_license_in_edit_ejs.dob,
            carCompany: updated_license_in_edit_ejs.carCompany,
            carModel: updated_license_in_edit_ejs.carModel,
            plateNumber: updated_license_in_edit_ejs.plateNumber,
            carYear: updated_license_in_edit_ejs.carYear
        }, (error, license_details_updated_in_db) => {
            if (error) {
                console.log(error);
            } else {
                console.log("$$$$$$$$ Here is the updated employee in DB based of ID passed $$$$$$$$");
                console.log(license_details_updated_in_db);
                res.redirect("/driveTest/home");
            }
        })
    }

    static deleteDataController = (req, res) => {
        const id_from_delete_button = req.params.id;

        userDataModel.findByIdAndDelete(id_from_delete_button, (error, license_details_deleted_from_db) => {
            if (error) {
                console.log(error);
            } else {
                console.log("@@@@@@@@@@@@ Employee Deleted From DB Using findByIDAndDelete @@@@@@@@@@@@");
                console.log(license_details_deleted_from_db);
                res.redirect("/driveTest/all");
            }
        })
    }

    static deleteAppointmentDataController = (req, res) => {
        const id_from_delete_button = req.params.id;

        adminDataModel.findByIdAndDelete(id_from_delete_button, (error, details_deleted_from_db) => {
            if (error) {
                console.log(error);
            } else {
                console.log("@@@@@@@@@@@@ slot DB Using findByIDAndDelete @@@@@@@@@@@@");
                console.log(details_deleted_from_db);
                res.redirect("/driveTest/home");
            }
        })
    }

    static allDataController = (req, res) => {
        userDataModel.find({}, (error, all_driver_details) => {
            if (error) {
                console.log(error);
            } else {
                console.log("++++++++ All employees from mongoDB ++++++++++");
                console.log(all_driver_details);
                res.render("display.ejs", { details: all_driver_details, notVisible: req.session.notVisible, visible: req.session.visible });
            }
        })
    }

    static signUpController = async (req, res) => {
        const form_data = req.body;
        const hashPassword = await bcrypt.hash(form_data.password, 10);

        userDataModel.create({
            email: form_data.email,
            password: hashPassword,
            userType: form_data.UserType
        }, (error, userData_inserted) => {
            if (error) {
                console.log("---Sorry data is not added to DB due to error Below -----");
                console.log(error);
                res.render("login.ejs", { msg: 'Please, singup with different email', color: "red", notVisible: req.session.notVisible, visible: req.session.visible });

            } else {
                console.log("*** data added successfully to DB***");
                console.log(userData_inserted);
                res.render("login.ejs", { msg: "Sing up Successful👍", color: "green", notVisible: req.session.notVisible, visible: req.session.visible });
            }
        })
    }

    static addAppointmentController = async (req, res) => {
        if (req.session.userType == "Admin") {
            const date = await adminDataModel.find({ date: req.body.date });
            let present = 0;

            if(req.body.time && req.body.date){
                    if (date.length > 0) {
                    for (let i = 0; i < date.length; i++) {
                        if (date[i].time == req.body.time) {
                            present = 1;
                        }
                    }
                    if (present == 0) {
                        const form_data = req.body;

                        adminDataModel.create({
                            date: form_data.date,
                            time: form_data.time
                        }, (error, appointment_inserted) => {
                            if (error) {
                                console.log("---Sorry data is not added to DB due to error Below -----");
                                console.log(error);
                                res.render("appointment.ejs", { msg: "Error due to DB", color: "red", visible: "", notVisible: "none" });

                            } else {
                                console.log("*** data added successfully to DB***");
                                console.log(appointment_inserted);
                                res.render("appointment.ejs", { msg: "New time added successfully, in exisiting date", color: "blue", visible: "", notVisible: "none" });
                            }
                        })
                    }
                    else {
                        console.log("present")
                        res.render("appointment.ejs", { msg: "Appointment already exists, please select new time", color: "red", visible: "", notVisible: "none" });

                    }
                }
                else {
                        const form_data = req.body;

                        adminDataModel.create({
                            date: form_data.date,
                            time: form_data.time
                        }, (error, appointment_inserted) => {
                            if (error) {
                                console.log("---Sorry data is not added to DB due to error Below -----");
                                console.log(error);
                                res.redirect("/driveTest/appointment");
                                res.render("appointment.ejs", { msg: "Error due to DB", color: "red", visible: "", notVisible: "none" });

                            } else {
                                console.log("*** data added successfully to DB***");
                                console.log(appointment_inserted);
                                res.render("appointment.ejs", { msg: "New time added successfully, with new date", color: "green", visible: "", notVisible: "none" });
                            }
                        })
                }
            }else if(req.body.date){
                const appointment_details_from_db = await adminDataModel.find({date:req.body.date});
                let true_value = [];
                let false_value = [];
                let time_id = [];
                for (let i = 0; i < appointment_details_from_db.length; i++) {
                 if(appointment_details_from_db[i].isTimeSlotAvailable == true){
                    true_value.push(appointment_details_from_db[i].time);
                     time_id.push(appointment_details_from_db[i]._id);
                }
             }

             for (let i = 0; i < appointment_details_from_db.length; i++) {
                if(appointment_details_from_db[i].isTimeSlotAvailable == false){
                    false_value.push(appointment_details_from_db[i].time);
               }
            }
           
             res.render('avability.ejs', {timing:true_value, timingId: time_id, fdate: false_value, notVisible: req.session.notVisible, visible: req.session.visible });
            }
        }
    
     }
    
    static bookGappointmentController = async (req, res) => {
        req.session.examType = req.body.examType;
        const id_from_action_attribute = req.params.id;
        req.session.bookingDate = req.body.date;
       const appointment_details_from_db = await adminDataModel.find({date:req.body.date});
       console.log(appointment_details_from_db);
       let time = [];
       let time_id = [];
       for (let i = 0; i < appointment_details_from_db.length; i++) {
            if(appointment_details_from_db[i].isTimeSlotAvailable == true){
                time.push(appointment_details_from_db[i].time);
                time_id.push(appointment_details_from_db[i]._id);
            }
        }
        req.session.time = time;
        req.session.time_id = time_id;
            res.render('time.ejs', {timing:time, timingId: time_id, notVisible: req.session.notVisible, visible: req.session.visible });

    }

    static timingController = async(req, res) => {
    let user_timing_id = "";
        for (let i = 0; i < req.session.time.length; i++){
            if(req.session.time[i] == req.body.timeSlot){
                 user_timing_id = req.session.time_id[i];
            }
        }

        adminDataModel.findByIdAndUpdate( user_timing_id, {
                isTimeSlotAvailable: false
            }, (error, appointment_details_updated_in_db) => {
                if (error) {
                    console.log("adminModel");
                    console.log(error);
                } else {
                    console.log("$$$$$$$$ admin model $$$$$$$$");
                    console.log(appointment_details_updated_in_db);
                }})

        userDataModel.findByIdAndUpdate(req.session.userId, {
                appointment_date : req.session.bookingDate,
                appointment_time : req.body.timeSlot,
                exam_type: req.session.examType
            }, (error, slotUpdate) => {
                if (error) {
                    console.log("userModel");
                    console.log(error);
                    res.redirect("/driveTest/home");
    
                } else {
                    console.log("$$$$$$$$ user Model $$$$$$$$");
                    console.log(slotUpdate);
                    res.redirect("/driveTest/g");
                }
            })
}
    
    static userVerificationController = async (req, res) => {
        const { email, password } = req.body;
        const confirm_user_in_db = await userDataModel.findOne({ email: email })
        if (!confirm_user_in_db) {
            res.render("login.ejs", { msg: "😢 User Not Found, Please Enter Valid Email", color: "red",  notVisible: "", visible: "none", driver: "none", admin:"none"});
        } else {
            const isMatch = await bcrypt.compare(password, confirm_user_in_db.password);
            if (isMatch) {
                req.session.userId = confirm_user_in_db._id;
                req.session.userType = confirm_user_in_db.userType;
                var userType_from_db = confirm_user_in_db.userType;
                req.session.userName = confirm_user_in_db.fName;
                req.session.userEmail = confirm_user_in_db.email;
                req.session.selectedType = req.body.UserType;
                console.log(req.session.userType)
                console.log(req.session.selectedType)
                req.session.visible = "";
                req.session.notVisible = "none";
                res.redirect("/driveTest/home");

            } else {
                res.render("login.ejs", { msg: "Incorrect Password 😔, Please Enter Valid Password", color: "red", notVisible: "", visible: "none", driver: "none", admin:"none", examiner:"none"});

            }
        }
    }

    static drivertestController = async (req, res) => {
        if (req.session.userType == "Examiner") {
            res.render("examiner.ejs", {table:"none", result:0});
        }else{
            res.redirect("/driveTest/login");
        }
    }

    static vendorController = async (req, res) => {
        console.log("Vendor");
        if (req.session.userType == "Admin") {
            userDataModel.find({}, (error, user_data) => {
                if (error) {
                    console.log(error);
                } else {
                    if (user_data.length >= 1) {
                        console.log(user_data)
                        console.log(user_data.length)
                        res.render("vendor.ejs", { "table": "block", details: user_data, notVisible: req.session.notVisible, visible: req.session.visible });
    
                    } else {
                        res.render('dashboard.ejs', { errormsg: "User Not Found!", color: "red", notVisible: req.session.notVisible, visible: req.session.visible })
                    }
                }
            })









        }else{
            res.redirect("/driveTest/login");
        }
    }
    static searchDriverController = async (req, res) => {
        if (req.session.userType == "Examiner") {
            console.log(req.body)

            const date = await userDataModel.find({ appointment_date: req.body.date });
            console.log(date)

            if(date.length >=1){
                console.log("1")
                console.log(date)
                res.render("examiner.ejs", {result:date, table:"", type:req.body.examType});
            }else{
                console.log("2")
                console.log(date)

                let result  = 0;
                res.render("examiner.ejs", {result:date, table:"" });
            }
            
         }
     }

    static examController = async (req, res) => {
        // console.log(req.params.id)
        //              res.render("exam.ejs");

        if (req.session.userType == "Examiner") {
            const id_from_button= req.params.id;
            req.session.driverID = req.params.id;
            userDataModel.findById(id_from_button, (error, user_details_from_db) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("@@@@@@@@@@@@ Employee Deleted From DB Using findByIDAndDelete @@@@@@@@@@@@");
                    console.log(user_details_from_db);
                    console.log(user_details_from_db.fName)
                    // res.redirect("/driveTest/exam");
                     res.render("exam.ejs", {user:user_details_from_db});

                }
            })
        }else{
        res.redirect("/driveTest/login");
            // res.render("examiner.ejs", {table:"none", result:0});
        }
    }

    static sendToVendorController = async (req, res) => {
        // console.log(req.params.id)
        //              res.render("exam.ejs");

        if (req.session.userType == "Admin") {
            const id_from_button= req.params.id;
            req.session.driverID = req.params.id;
            userDataModel.findByIdAndUpdate(id_from_button, {
                vendor: true
            }, (error, details_updated) => {
                if (error) {
                    console.log("userModel");
                    console.log(error);
                } else {
                    console.log("$$$$$$$$ user model $$$$$$$$");
                    console.log(details_updated);
                    res.redirect("/driveTest/vendor");
                }})
        }else{
        res.redirect("/driveTest/login");
            // res.render("examiner.ejs", {table:"none", result:0});
        }
    }


    static resultController = async (req, res) => {
    
        if (req.session.userType == "Examiner") {
            // console.log(req.session.driverID)
            console.log(req.body.overall)
            if(req.body.overall == "Pass"){
                userDataModel.findByIdAndUpdate(req.session.driverID, {
                    result: "PASS",
                    comment: req.body.comment
                }, (error, details_updated) => {
                    if (error) {
                        console.log("userModel");
                        console.log(error);
                    } else {
                        console.log("$$$$$$$$ user model $$$$$$$$");
                        console.log(details_updated);
                        res.redirect("/driveTest/home");
                    }})
            }else if(req.body.overall == "Fail"){
                userDataModel.findByIdAndUpdate(req.session.driverID, {
                    result: "Fail",
                    comment: req.body.comment

                }, (error, details_updated) => {
                    if (error) {
                        console.log("userModel");
                        console.log(error);
                    } else {
                        console.log("$$$$$$$$ user model $$$$$$$$");
                        console.log(details_updated);
                        res.redirect("/driveTest/home");
                    }})
            }
        }else{
        res.redirect("/driveTest/login");
            // res.render("examiner.ejs", {table:"none", result:0});
        }
    }
}

module.exports = DriveTestController