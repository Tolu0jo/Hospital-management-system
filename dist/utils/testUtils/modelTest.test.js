"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctorModel_1 = __importDefault(require("../../model/doctorModel"));
const testUtils_1 = require("./testUtils");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const patientModel_1 = __importDefault(require("../../model/patientModel"));
(0, globals_1.beforeAll)(async () => await (0, testUtils_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, testUtils_1.dbDisconnect)());
(0, globals_1.describe)("Doctor Model Test Suite", () => {
    (0, globals_1.test)("should create a Doctor data successfully", async () => {
        const DoctorData = {
            email: "tolu@gmail.com",
            DoctorsName: "Tolu",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        const newDoctorData = new doctorModel_1.default(DoctorData);
        await newDoctorData.save();
        (0, globals_2.expect)(newDoctorData._id).toBeDefined();
        (0, globals_2.expect)(newDoctorData.email).toBe(DoctorData.email);
        (0, globals_2.expect)(newDoctorData.DoctorsName).toBe(DoctorData.DoctorsName);
        (0, globals_2.expect)(newDoctorData.password).toBe(DoctorData.password);
        (0, globals_2.expect)(newDoctorData.gender).toBe(DoctorData.gender);
        (0, globals_2.expect)(newDoctorData.specialization).toBe(DoctorData.specialization);
    });
    (0, globals_1.test)("should fail for Doctor data without required fields", async () => {
        const invalidDoctorData = {
            email: "tolu@gmail.com",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        try {
            const newDoctorData = new doctorModel_1.default(invalidDoctorData);
            await newDoctorData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.DoctorsName).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for Doctor data with bad input fields", async () => {
        const invalidDoctorData = {
            DoctorsName: "Tolu",
            email: "tolugmail.com",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        try {
            const newDoctorData = new doctorModel_1.default(invalidDoctorData);
            await newDoctorData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.email).toBeDefined();
        }
    });
});
(0, globals_1.describe)("Patient Model Test Suite", () => {
    (0, globals_1.test)("should create a Patient data successfully", async () => {
        const PatientData = {
            doctorId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            patientName: "Tayo",
            age: 12,
            weight: "34kg",
            height: "2m",
            bloodGroup: "o+",
            genotype: "AS",
            bloodPressure: "123",
            HIV_status: "positive",
            hepatitis: "b+",
        };
        const newPatientData = new patientModel_1.default({
            doctorId: new mongoose_1.default.Types.ObjectId(PatientData.doctorId),
            patientName: PatientData.patientName,
            age: PatientData.age,
            weight: PatientData.weight,
            height: PatientData.height,
            bloodGroup: PatientData.bloodGroup,
            genotype: PatientData.genotype,
            bloodPressure: PatientData.bloodPressure,
            HIV_status: PatientData.HIV_status,
            hepatitis: PatientData.hepatitis,
        });
        await newPatientData.save();
        (0, globals_2.expect)(newPatientData._id).toBeDefined();
        (0, globals_2.expect)(newPatientData.doctorId).toEqual(PatientData.doctorId);
        (0, globals_2.expect)(newPatientData.patientName).toBe(PatientData.patientName);
        (0, globals_2.expect)(newPatientData.age).toBe(PatientData.age);
        (0, globals_2.expect)(newPatientData.weight).toBe(PatientData.weight);
        (0, globals_2.expect)(newPatientData.height).toBe(PatientData.height);
        (0, globals_2.expect)(newPatientData.genotype).toBe(PatientData.genotype);
        (0, globals_2.expect)(newPatientData.bloodGroup).toBe(PatientData.bloodGroup);
        (0, globals_2.expect)(newPatientData.bloodPressure).toBe(PatientData.bloodPressure);
        (0, globals_2.expect)(newPatientData.HIV_status).toBe(PatientData.HIV_status);
        (0, globals_2.expect)(newPatientData.hepatitis).toBe(PatientData.hepatitis);
    });
    (0, globals_1.test)("should fail for Patient data without required fields", async () => {
        const invalidPatientData = {
            patientName: "Tayo",
            age: 12,
            weight: "34kg",
            height: "2m",
            bloodGroup: "o+",
            genotype: "AS",
            bloodPressure: "123",
            HIV_status: "positive",
            hepatitis: "b+",
        };
        try {
            const newPatientData = new patientModel_1.default(invalidPatientData);
            await newPatientData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.doctorId).toBeDefined();
        }
    });
    (0, globals_1.test)("doctor should update a report successfully", async () => {
        const patient = {
            patientName: "Joan",
            age: 26,
            weight: "65kg",
            height: "5ft7",
            bloodGroup: "o+",
            genotype: "AA",
            bloodPressure: "120Hg",
            HIV_status: "negative",
            hepatitis: "negative",
            doctorId: new mongoose_1.default.Types.ObjectId(),
        };
        const createPatient = await patientModel_1.default.create(patient);
        const updatedData = {
            patientName: "Joan",
            age: 27,
            weight: "65kg",
            height: "5ft7",
            bloodGroup: "o+",
            genotype: "AA",
            bloodPressure: "120Hg",
            HIV_status: "negative",
            hepatitis: "negative",
            doctorId: new mongoose_1.default.Types.ObjectId(),
        };
        const updatedReport = await patientModel_1.default.findByIdAndUpdate(createPatient._id, updatedData, { new: true });
        (0, globals_2.expect)(updatedReport?._id).not.toBeNull();
        (0, globals_2.expect)(updatedReport?.patientName).toEqual(updatedData.patientName);
        (0, globals_2.expect)(updatedReport?.age).toEqual(updatedData.age);
        (0, globals_2.expect)(updatedReport?.weight).toEqual(updatedData.weight);
        (0, globals_2.expect)(updatedReport?.height).toEqual(updatedData.height);
        (0, globals_2.expect)(updatedReport?.bloodGroup).toEqual(updatedData.bloodGroup);
        (0, globals_2.expect)(updatedReport?.genotype).toEqual(updatedData.genotype);
        (0, globals_2.expect)(updatedReport?.bloodPressure).toEqual(updatedData.bloodPressure);
        (0, globals_2.expect)(updatedReport?.HIV_status).toEqual(updatedData.HIV_status);
        (0, globals_2.expect)(updatedReport?.hepatitis).toEqual(updatedData.hepatitis);
        (0, globals_2.expect)(updatedReport?.doctorId).toEqual(updatedData.doctorId);
    });
    (0, globals_1.test)("should delete a report successfully", async () => {
        let report = {
            patientName: "Joan",
            age: 24,
            weight: "65kg",
            height: "5ft7",
            bloodGroup: "o+",
            genotype: "AA",
            bloodPressure: "120Hg",
            HIV_status: "negative",
            hepatitis: "negative",
            doctorId: new mongoose_1.default.Types.ObjectId(),
        };
        const newPatient = new patientModel_1.default({
            patientName: report.patientName,
            age: report.age,
            weight: report.weight,
            height: report.height,
            bloodGroup: report.bloodGroup,
            genotype: report.genotype,
            bloodPressure: report.bloodPressure,
            HIV_status: report.HIV_status,
            hepatitis: report.hepatitis,
            doctorId: new mongoose_1.default.Types.ObjectId(report.doctorId),
        });
        await newPatient.save();
        const deleteResult = await patientModel_1.default.deleteOne({ _id: newPatient._id });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(1);
    });
});
