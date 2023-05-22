//how i want my data to be saved
import mongoose, { Schema } from "mongoose";

export interface DoctorAttributes {
  _id: string;
  email: string;
  DoctorsName: string;
  password: string;
  phoneNumber: string;
  gender: string;
  specialization: string;
  image:string
}

//exporting a class of userinstance having d ppties of userattributes

const DoctorSchema = new Schema(
  {
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      required: true,
      unique: true,
    },
    DoctorsName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique:true,
    },
    gender: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
 image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.doctorId = ret._id,
          delete ret._id,
          delete ret.password,
          delete ret.__v;
      },
    },
  }
);

const Doctor = mongoose.model<DoctorAttributes>("Doctor", DoctorSchema);
export default Doctor;
