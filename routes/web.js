//  Vinit Mohanbhai Dabhi - 8804874

const express = require('express');

const router = express.Router();

const DriveTestController = require('../controllers/driveTest_controller.js');

router.get('/home', DriveTestController.dashboardController);
router.get('/login', DriveTestController.loginController);
router.get('/g2', DriveTestController.g2Controller);
router.get('/g', DriveTestController.gController);
router.post('/adddata/:id', DriveTestController.addDataController);
router.post('/GetG2Data', DriveTestController.getG2DataController);
router.post('/update/:id', DriveTestController.updateCarInfoController);
router.get('/all', DriveTestController.allDataController);
router.get('/delete/:id', DriveTestController.deleteDataController);
router.get('/deleteAppointment/:id', DriveTestController.deleteAppointmentDataController);

router.post('/register_user', DriveTestController.signUpController);
router.post('/user_verification', DriveTestController.userVerificationController);
router.get('/logout', DriveTestController.logoutController);
router.get('/appointment', DriveTestController.adminAppointmentController);
router.post('/add_appointment', DriveTestController.addAppointmentController);
router.post('/bookGappointment/:id', DriveTestController.bookGappointmentController);

router.post('/timing',  DriveTestController.timingController);
router.get('/drivertest', DriveTestController.drivertestController);
router.post('/searchDriver', DriveTestController.searchDriverController);
router.get('/exam/:id', DriveTestController.examController);
router.post('/result', DriveTestController.resultController);
router.get('/vendor', DriveTestController.vendorController);
router.get('/sendtovendor/:id', DriveTestController.sendToVendorController);

module.exports = router