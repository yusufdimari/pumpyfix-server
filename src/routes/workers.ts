import {
  addWorkerController,
  getAllWorkersController,
  getWorkerInformationController,
  getWorkersByServiceOfferedController,
} from "@controllers/workers";
import verifyAuth from "@middlewares/verifyAuth";
import { Router } from "express";

const router = Router();

// @desc Get all workers/service providers
// @route /workers/all
router.get("/all", verifyAuth, getAllWorkersController);

// @desc Get worker information
// @route /workers/me
router.get("/me", verifyAuth, getWorkerInformationController);

// @desc Get workers/service providers providing a specific service
// @route /workers/:serviceId
router.get("/:serviceId", verifyAuth, getWorkersByServiceOfferedController);

// @desc Add a new worker to workers collection
// @route /workers/add
router.post("/add", addWorkerController);

export default router;
