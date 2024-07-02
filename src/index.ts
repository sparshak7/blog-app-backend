import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB connection failed"));

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users/user", userRoute);

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
