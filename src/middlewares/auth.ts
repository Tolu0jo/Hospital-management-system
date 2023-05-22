import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Doctor  from "../model/doctorModel";
import { registerDoctorsSchema } from "../utils/utils";


const jwtsecret = process.env.JWT_SECRET as string;
export const auth =  async (
  req: Request | any,
  res: Response,
  next: NextFunction
) =>{
  try {
    const authorization = req.cookies.token;
    

    if (!authorization) {
      return res.status(401).json({ error: "Kindly sign in as a user" });
    }

    let verified = jwt.verify(authorization, jwtsecret);
   
   
    if (!verified) {
      return res
        .status(401)
        .json({ error: "token invalid,you cant access this route" });
    }

    const { doctorId } = verified as { [key: string]: string }; 

    const doctor = await Doctor.findOne({ _id:doctorId});

    if (!registerDoctorsSchema) {
      return res.status(401).json({ error: "kindly register as a user" });
    }

    req.user = verified;
    res.locals.user = doctor
  
   
    next();
  } catch (err) {
    res.render("errorPage")
    console.log(err)
  }
}


