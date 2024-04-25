import { Router } from "express";
import { userLoginController, userSignupController, workerLoginController } from "@controllers/auth";
const router = Router();

// @desc Register new user
// @route POST /auth/signup
router.post("/signup", userSignupController);

// @desc Log user in
// @route POST /auth/login
router.post("/login", userLoginController);

// @desc Log worker in
// @route POST /auth/worker/login
router.post("/worker/login", workerLoginController);

export default router;
