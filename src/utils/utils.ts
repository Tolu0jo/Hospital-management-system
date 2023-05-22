import Joi from "joi";
export const registerDoctorsSchema = Joi.object().keys({
  email: Joi.string()
    .lowercase()
    .regex(/^\S+@\S+\.\S+$/)
    .required(),
  DoctorsName: Joi.string().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,10}$/)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }), //we are not saving confirm password to ur db
  phoneNumber: Joi.string().required(),
  gender: Joi.string().required(),
  specialization: Joi.string().required(),
  image: Joi.string(),
});
//anytime the user is inputting something make sure u validate whether post or put

export const options = {
  //to structure the error message
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const loginDoctorsSchema = Joi.object().keys({
  email: Joi.string()
    .lowercase()
    .regex(/^\S+@\S+\.\S+$/)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,10}$/)
    .required(),
});

export const updatePatientSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase(),
  age: Joi.number(),
  weight: Joi.string(),
  height: Joi.string(),
  bloodGroup: Joi.string(),
  genotype: Joi.string(),
  bloodPressure: Joi.string(),
  HIV_status: Joi.string(),
  hepatitis: Joi.string(),
});

export const registerPatientSchema = Joi.object().keys({
  patientName: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.string().required(),
  height: Joi.string().required(),
  bloodGroup: Joi.string().required(),
  genotype: Joi.string().required(),
  bloodPressure: Joi.string().required(),
  HIV_status: Joi.string().required(),
  hepatitis: Joi.string().required(),
});
