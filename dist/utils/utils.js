"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPatientSchema = exports.updatePatientSchema = exports.loginDoctorsSchema = exports.options = exports.registerDoctorsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerDoctorsSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .lowercase()
        .regex(/^\S+@\S+\.\S+$/)
        .required(),
    DoctorsName: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{6,10}$/)
        .required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
    phoneNumber: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    specialization: joi_1.default.string().required(),
    image: joi_1.default.string(),
});
//anytime the user is inputting something make sure u validate whether post or put
exports.options = {
    //to structure the error message
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.loginDoctorsSchema = joi_1.default.object().keys({
    email: joi_1.default.string()
        .lowercase()
        .regex(/^\S+@\S+\.\S+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{6,10}$/)
        .required(),
});
exports.updatePatientSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase(),
    age: joi_1.default.number(),
    weight: joi_1.default.string(),
    height: joi_1.default.string(),
    bloodGroup: joi_1.default.string(),
    genotype: joi_1.default.string(),
    bloodPressure: joi_1.default.string(),
    HIV_status: joi_1.default.string(),
    hepatitis: joi_1.default.string(),
});
exports.registerPatientSchema = joi_1.default.object().keys({
    patientName: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    weight: joi_1.default.string().required(),
    height: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string().required(),
    genotype: joi_1.default.string().required(),
    bloodPressure: joi_1.default.string().required(),
    HIV_status: joi_1.default.string().required(),
    hepatitis: joi_1.default.string().required(),
});
