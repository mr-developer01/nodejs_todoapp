import express from "express";
import { getMyprofile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// all user
router.get("/me",isAuthenticated ,getMyprofile)

// new user
router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);

// Update user
// router.route("/userid/:id").get(getUserDetails)



export default router;