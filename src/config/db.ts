import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
   
  } catch (err) {
    console.log(err);
  }
};
