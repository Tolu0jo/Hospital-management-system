"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doctorModel_1 = __importDefault(require("../model/doctorModel"));
const utils_1 = require("../utils/utils");
const jwtsecret = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.status(401).json({ error: "Kindly sign in as a user" });
        }
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res
                .status(401)
                .json({ error: "token invalid,you cant access this route" });
        }
        const { doctorId } = verified;
        const doctor = await doctorModel_1.default.findOne({ _id: doctorId });
        if (!utils_1.registerDoctorsSchema) {
            return res.status(401).json({ error: "kindly register as a user" });
        }
        req.user = verified;
        res.locals.user = doctor;
        next();
    }
    catch (err) {
        res.render("errorPage");
        console.log(err);
    }
};
exports.auth = auth;
