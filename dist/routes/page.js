"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const patientController_1 = require("../controller/patientController");
const auth_1 = require("../middlewares/auth");
const doctorModel_1 = __importDefault(require("../model/doctorModel"));
const patientModel_1 = __importDefault(require("../model/patientModel"));
const router = express_1.default.Router();
router.get("/error", (req, res, next) => {
    res.render("errorPage");
});
router.get("/", (req, res, next) => {
    res.render("login");
});
router.get("/register", (req, res, next) => {
    res.render("register");
});
router.get("/dashboard", auth_1.auth, async (req, res) => {
    try {
        res.locals.user;
        const { doctorId } = req.user;
        const myPatient = await patientModel_1.default.find({ doctorId });
        const patients = await patientModel_1.default.find();
        const doctors = await doctorModel_1.default.find();
        return res.render("dashboard", {
            doctor: res.locals.user, myPatient, patients, doctors
        });
    }
    catch (err) {
        res.render("errorPage");
        console.log(err);
    }
});
router.get("/patients", auth_1.auth, patientController_1.getMyPatient);
router.get("/allPatients", auth_1.auth, patientController_1.getAllPatient);
router.get("/createPatient", auth_1.auth, (req, res, next) => {
    res.render("createPatient");
});
router.get("/allDoctors", auth_1.auth, doctorController_1.getDoctors);
router.get('/editDoctorPage', auth_1.auth, async (req, res, next) => {
    res.locals.user;
    res.render("editDoctorPage", { doctor: res.locals.user });
});
exports.default = router;
