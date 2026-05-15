import express from "express";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { config } from "./src/config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



app.listen(config.port || 5000, () => {
  console.log(`Server is running on port ${config.port}`);
});