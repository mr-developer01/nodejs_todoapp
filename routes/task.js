import express from "express";
import { deletetask, getMytask, newTask, updatetask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router()

// Adding new task:--
router.post("/new", isAuthenticated, newTask);

// Getting all task of login-User:--
router.get("/my", isAuthenticated, getMytask);

// Updating and Deleting task:--
router.route("/:id").put(isAuthenticated, updatetask).delete(isAuthenticated, deletetask)

export default router;