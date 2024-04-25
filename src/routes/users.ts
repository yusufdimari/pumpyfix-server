import { getAllUsersController, getUserInformationController } from "@controllers/users";
import { verifyAuth } from "@middlewares/index";
import { Router } from "express";

const router = Router();

// @desc Get all useer
// @route /users/all
router.get("/all", getAllUsersController);

// @desc Get user information
// @route /users/me
router.get("/me", verifyAuth, getUserInformationController);

export default router;
