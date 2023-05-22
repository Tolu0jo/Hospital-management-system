import { Console } from "console";
import { NextFunction, Request, Response } from "express";
import { getDefaultLibFilePath } from "typescript";
import { v4 as uuidv4 } from "uuid";
import Patient from "../model/patientModel";
import {
  updatePatientSchema,
  registerPatientSchema,
  options,
} from "../utils/utils";

export const createPatient = async (req: Request | any, res: Response) => {
  try {
    const { doctorId } = req.user;

    const validationResult = registerPatientSchema.validate(req.body, options);
    
    if (validationResult.error) {
      return res
      .render("createPatient",{ error: validationResult.error.details[0].message })
    }
    const patient = new Patient({
      ...req.body,
      doctorId,
    });

    await patient.save();

    res.redirect("/patients");
  } catch (error) {
    console.log(error);
    res.render("errorPage")
  }
};

export const getAllPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await Patient.find();

    return res.render("allPatients", {
      Patients: patients,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getPatient = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById({
      _id: patientId,
    });

    if (!patient) {
      res.status(401).json({ msg: "No patient found" });
    }
    return res.status(200).json({ msg: "Patient", patient });
  } catch (error) {
    console.log(error);
    res.render("errorPage")
  }
};

export const getMyPatient = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId } = req.user;

    const myPatient = await Patient.find({ doctorId });

    return res.render("patients", { patients: myPatient });
  } catch (error) {
    console.log(error);
    res.render("errorPage")
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId = req.params.id;
    const record = await Patient.findByIdAndDelete({ _id: patientId });
    return res.redirect("/patients");
  } catch (err) {
    console.log(err);
    res.render("errorPage")
  }
};

export const editPatientPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId = req.params.id;

    const patientToUpdate = await Patient.findById({ _id: patientId });
    if (!patientToUpdate) {
      return res.redirect("/patients");
    }

    return res.render("editPatient", {
      title: "Edit patient",
      patient: patientToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.render("errorPage")
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId = req.params.id;
    const _id = patientId;

    const {
      patientName,
      age,
      weight,
      height,
      bloodGroup,
      genotype,
      bloodPressure,
      HIV_status,
      hepatitis,
    } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(_id, {
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
  } catch (err) {
    console.log(err);
    res.render("errorPage")
  }
};
