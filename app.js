import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares/auth.js";
import { errorMiddleare } from "./middlewares/error.js";
import cors from "cors";

export const app = express()

config({
    path: "./data/config.env",
});

// MIDDLEWARE:--
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    sameSite: process.envNODE_ENV === "Development" ? "lax" : "none",
    secure: process.envNODE_ENV === "Development" ? false : true,
}))

//using router:--
app.use("/api/v1/users", userRouter)
app.use("/api/v1/task", isAuthenticated, taskRouter)


app.get("/", (req, res) => {
    res.send("Hello RAhul");
});

// node error handling:--

app.use(errorMiddleare)