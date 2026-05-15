import express from "express";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import messageRouter from "./src/routes/message.routes.js";
import { config } from "./src/config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app,server } from "./src/utils/socket.js";
import path from "path";

const __dirname = path.resolve();
// const app = express();
app.use(cookieParser());

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

 

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// make ready for deployment
if (config.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(config.port || 5000, () => {
  console.log(`Server is running on port ${config.port}`);
  connectDB();
});