import {
  addMultipleServices,
  addServiceController,
  getAllServicesController,
  getMostBookedServicesController,
} from "@controllers/services";
import { verifyAdmin, verifyAuth } from "@middlewares/index";
import { Router } from "express";

const router = Router();

// @desc Get all services registered on app
// @route /services/all
router.get("/all", getAllServicesController);

// @desc Get the most booked services on the app
// @route /services/most-booked
router.get("/most-booked", verifyAuth, getMostBookedServicesController);

// @desc Register/add a new service
// @route /services/add
router.post("/new", verifyAdmin, addServiceController);

// @desc Register/add a new service
// @route /services/add-multiple
router.post("/add-multiple", verifyAdmin, addMultipleServices);

export default router;
