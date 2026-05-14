import express from "express";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { config } from "./src/config/config.js";



const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



app.listen(config.port || 5000, () => {
  console.log(`Server is running on port ${config.port}`);
});