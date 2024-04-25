import { addHandymanReviewController, getHandymanReviewsController } from "@controllers/reviews";
import verifyAuth from "@middlewares/verifyAuth";
import { Router } from "express";

const router = Router();

// @desc Get reviews of a particular worker/handyman
// @route /reviews/:workerId
router.get("/:workerId", verifyAuth, getHandymanReviewsController);

// @desc Add a new review for a handyman
// @route /reviews/add
router.post("/add", verifyAuth, addHandymanReviewController);

export default router;
