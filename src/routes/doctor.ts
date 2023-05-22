import express from 'express';
import { Login, logOut, register, updateDoctor } from '../controller/doctorController';
import { auth } from '../middlewares/auth';
import { upload } from '../utils/multer';



const router = express.Router();


router.post('/register',upload.single("image"),register);
router.post("/login",Login)
router.get("/logout",logOut);
router.post("/editDoctor",auth,upload.single("image"),updateDoctor)


export default router;
 