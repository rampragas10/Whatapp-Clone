import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();



app.use("/api/auth", authRouter);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});