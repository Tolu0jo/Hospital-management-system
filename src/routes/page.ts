import express, { Request, Response, NextFunction } from "express";
import { getDoctors } from "../controller/doctorController";
import { getAllPatient, getMyPatient } from "../controller/patientController";

import { auth } from "../middlewares/auth";
import Doctor from "../model/doctorModel";
import Patient from "../model/patientModel";

import { updatePatientSchema, options } from "../utils/utils";

const router = express.Router();
router.get("/error", (req: Request, res: Response, next: NextFunction) => {
  res.render("errorPage");
});

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});
router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("register");
});

router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    res.locals.user
    const { doctorId } = req.user;

    const myPatient = await Patient.find({ doctorId });
    const patients = await Patient.find();
    const doctors = await Doctor.find();



    return res.render("dashboard", {
      doctor: res.locals.user, myPatient,patients,doctors
    });
  } catch (err) {
    res.render("errorPage")
    console.log(err);
  }
});
router.get("/patients",auth, getMyPatient)
router.get("/allPatients",auth, getAllPatient)
router.get("/createPatient",auth,(req: Request, res: Response, next: NextFunction) => {
    res.render("createPatient");
  })
router.get("/allDoctors",auth,getDoctors)
router.get('/editDoctorPage',auth,async(req: Request|any, res: Response, next: NextFunction) => {
  
  res.locals.user
  res.render("editDoctorPage",{ doctor: res.locals.user});
});


export default router;
