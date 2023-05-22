
import express from 'express';
import { createPatient, getAllPatient, updatePatient,getMyPatient, deletePatient, getPatient, editPatientPage} from '../controller/patientController';
import {auth} from "../middlewares/auth"


const router = express.Router();



/* GET home page. */
router.post('/create', auth, createPatient);
router.get('/getAllPatient', auth, getAllPatient);
router.get('/getMyPatient/:id', auth, getMyPatient);
router.get('/editPage/:id', auth,editPatientPage);
router.get('/deletePatient/:id',auth, deletePatient)
router.get("/getPatient/:id",auth,getPatient)
router.post("/updatePatient/:id",auth,updatePatient)

export default router;
