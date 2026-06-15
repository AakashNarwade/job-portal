import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connectionSuccessful = await mongoose.connect(process.env.DB_URI);
    console.log("connected to db successfully ");
  } catch (error) {
    console.log("db connection failed -> ", error);
  }
};

export default dbConnection;
