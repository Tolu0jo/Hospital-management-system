import Doctor from "../../model/doctorModel";
import { dbConnect, dbDisconnect} from "./testUtils";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import Patient from "../../model/patientModel";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("Doctor Model Test Suite", () => {
  test("should create a Doctor data successfully", async () => {
    const DoctorData = {
      email: "tolu@gmail.com",
      DoctorsName: "Tolu",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    const newDoctorData = new Doctor(DoctorData);
    await newDoctorData.save();
    expect(newDoctorData._id).toBeDefined();
    expect(newDoctorData.email).toBe(DoctorData.email);
    expect(newDoctorData.DoctorsName).toBe(DoctorData.DoctorsName);
    expect(newDoctorData.password).toBe(DoctorData.password);
    expect(newDoctorData.gender).toBe(DoctorData.gender);
    expect(newDoctorData.specialization).toBe(DoctorData.specialization);
  });
  test("should fail for Doctor data without required fields", async () => {
    const invalidDoctorData = {
      email: "tolu@gmail.com",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    try {
      const newDoctorData = new Doctor(invalidDoctorData);
      await newDoctorData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.DoctorsName).toBeDefined();
    }
  });
  test("should fail for Doctor data with bad input fields", async () => {
    const invalidDoctorData = {
      DoctorsName: "Tolu",
      email: "tolugmail.com",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    try {
      const newDoctorData = new Doctor(invalidDoctorData);
      await newDoctorData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.email).toBeDefined();
    }
  });
});

describe("Patient Model Test Suite", () => {
  test("should create a Patient data successfully", async () => {
    const PatientData = {
      doctorId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
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

    const newPatientData = new Patient({
      doctorId: new mongoose.Types.ObjectId(PatientData.doctorId),
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
    expect(newPatientData._id).toBeDefined();
    expect(newPatientData.doctorId).toEqual(PatientData.doctorId);
    expect(newPatientData.patientName).toBe(PatientData.patientName);
    expect(newPatientData.age).toBe(PatientData.age);
    expect(newPatientData.weight).toBe(PatientData.weight);
    expect(newPatientData.height).toBe(PatientData.height);
    expect(newPatientData.genotype).toBe(PatientData.genotype);
    expect(newPatientData.bloodGroup).toBe(PatientData.bloodGroup);
    expect(newPatientData.bloodPressure).toBe(PatientData.bloodPressure);
    expect(newPatientData.HIV_status).toBe(PatientData.HIV_status);
    expect(newPatientData.hepatitis).toBe(PatientData.hepatitis);
  });
  test("should fail for Patient data without required fields", async () => {
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
      const newPatientData = new Patient(invalidPatientData);
      await newPatientData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.doctorId).toBeDefined();
    }
  });
  test("doctor should update a report successfully", async () => {
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
      doctorId: new mongoose.Types.ObjectId(),
    };
    const createPatient = await Patient.create(patient);
    const updatedData = {
      patientName:"Joan",
      age: 27,
      weight: "65kg",
      height: "5ft7",
      bloodGroup: "o+",
      genotype: "AA",
      bloodPressure: "120Hg",
      HIV_status: "negative",
      hepatitis: "negative",
      doctorId: new mongoose.Types.ObjectId(),
    };
    const updatedReport = await Patient.findByIdAndUpdate(createPatient._id, updatedData, { new: true })
    expect(updatedReport?._id).not.toBeNull();
    expect(updatedReport?.patientName).toEqual(updatedData.patientName);
    expect(updatedReport?.age).toEqual(updatedData.age);
    expect(updatedReport?.weight).toEqual(updatedData.weight);
    expect(updatedReport?.height).toEqual(updatedData.height);
    expect(updatedReport?.bloodGroup).toEqual(updatedData.bloodGroup);
    expect(updatedReport?.genotype).toEqual(updatedData.genotype);
    expect(updatedReport?.bloodPressure).toEqual(updatedData.bloodPressure);
    expect(updatedReport?.HIV_status).toEqual(updatedData.HIV_status);
    expect(updatedReport?.hepatitis).toEqual(updatedData.hepatitis);
    expect(updatedReport?.doctorId).toEqual(updatedData.doctorId);
    
  });
  test("should delete a report successfully", async () => {
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
      doctorId: new mongoose.Types.ObjectId(),
    };
    const newPatient = new Patient({
      patientName: report.patientName,
      age: report.age,
      weight: report.weight,
      height: report.height,
      bloodGroup: report.bloodGroup,
      genotype: report.genotype,
      bloodPressure: report.bloodPressure,
      HIV_status: report.HIV_status,
      hepatitis: report.hepatitis,
      doctorId: new mongoose.Types.ObjectId(report.doctorId),
    });
    await newPatient.save();
    const deleteResult = await Patient.deleteOne({ _id: newPatient._id });
    expect(deleteResult.deletedCount).toEqual(1);
  });
});
