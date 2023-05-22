import mongoose, { Schema } from "mongoose";

export interface PatientAttributes {
  _id: string;
  doctorId: string;
  patientName: string;
  age: number;
  weight: string;
  height: string;
  bloodGroup: string;
  genotype: string;
  bloodPressure: string;
  HIV_status: string;
  hepatitis: string; 
}

//exporting a class of userinstance having d ppties of userattributes

const PatientSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    genotype: {
      type: String,
      required: true,
    },
    bloodPressure: {
      type: String,
      required: true,
    },
    HIV_status: {
      type: String,
      required: true,
    },
    hepatitis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        (ret.patientId = ret._id),
          delete ret._id,
          delete ret.password,
          delete ret.__v;
      },
    },
  }
);
const Patient = mongoose.model<PatientAttributes>("Patient", PatientSchema);
export default Patient;
