import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
//middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());
app.use(cors(corsOptions));

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "I am coming from backend ",
    success: true,
  });
});

app.listen(PORT, () => {
  dbConnection();
  console.log("hello from the backend");
});
