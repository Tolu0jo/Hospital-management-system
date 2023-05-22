"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = exports.editPatientPage = exports.deletePatient = exports.getMyPatient = exports.getPatient = exports.getAllPatient = exports.createPatient = void 0;
const patientModel_1 = __importDefault(require("../model/patientModel"));
const utils_1 = require("../utils/utils");
const createPatient = async (req, res) => {
    try {
        const { doctorId } = req.user;
        const validationResult = utils_1.registerPatientSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .render("createPatient", { error: validationResult.error.details[0].message });
        }
        const patient = new patientModel_1.default({
            ...req.body,
            doctorId,
        });
        await patient.save();
        res.redirect("/patients");
    }
    catch (error) {
        console.log(error);
        res.render("errorPage");
    }
};
exports.createPatient = createPatient;
const getAllPatient = async (req, res, next) => {
    try {
        const patients = await patientModel_1.default.find();
        return res.render("allPatients", {
            Patients: patients,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAllPatient = getAllPatient;
const getPatient = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const patient = await patientModel_1.default.findById({
            _id: patientId,
        });
        if (!patient) {
            res.status(401).json({ msg: "No patient found" });
        }
        return res.status(200).json({ msg: "Patient", patient });
    }
    catch (error) {
        console.log(error);
        res.render("errorPage");
    }
};
exports.getPatient = getPatient;
const getMyPatient = async (req, res, next) => {
    try {
        const { doctorId } = req.user;
        const myPatient = await patientModel_1.default.find({ doctorId });
        return res.render("patients", { patients: myPatient });
    }
    catch (error) {
        console.log(error);
        res.render("errorPage");
    }
};
exports.getMyPatient = getMyPatient;
const deletePatient = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const record = await patientModel_1.default.findByIdAndDelete({ _id: patientId });
        return res.redirect("/patients");
    }
    catch (err) {
        console.log(err);
        res.render("errorPage");
    }
};
exports.deletePatient = deletePatient;
const editPatientPage = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const patientToUpdate = await patientModel_1.default.findById({ _id: patientId });
        if (!patientToUpdate) {
            return res.redirect("/patients");
        }
        return res.render("editPatient", {
            title: "Edit patient",
            patient: patientToUpdate,
        });
    }
    catch (error) {
        console.log(error);
        res.render("errorPage");
    }
};
exports.editPatientPage = editPatientPage;
const updatePatient = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const _id = patientId;
        const { patientName, age, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis, } = req.body;
        const updatedPatient = await patientModel_1.default.findByIdAndUpdate(_id, {
            patientName,
            age,
            weight,
            height,
            bloodGroup,
            genotype,
            bloodPressure,
            HIV_status,
            hepatitis,
        });
        return res.redirect("/patients");
    }
    catch (err) {
        console.log(err);
        res.render("errorPage");
    }
};
exports.updatePatient = updatePatient;
