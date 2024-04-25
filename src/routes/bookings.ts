import { Router } from "express";
import {
  addBookingController,
  deleteBookingController,
  getAllVendorBookingsController,
  getBookingsController,
  getUpcomingBookingsController,
  getVendorUpcomingBookingsController,
  getWorkersBookingsController,
} from "@controllers/bookings";
import verifyAuth from "@middlewares/verifyAuth";

const router = Router();

// @desc Get all bookings for a user
// @route /bookings/all
router.get("/all", verifyAuth, getBookingsController);

// @desc Get all bookings for a worker
// @route /bookings/worker/all
router.get("/worker/all", verifyAuth, getWorkersBookingsController);

// @desc Get upcoming bookings for a user
// @route /bookings/upcoming
router.get("/upcoming", verifyAuth, getUpcomingBookingsController);

// @desc Get all bookings for a vendor
// @route /bookings/vendor/all
router.get("/vendor/all", verifyAuth, getAllVendorBookingsController);

// @desc Get upcoming bookings for a user
// @route /bookings/vendor/upcoming
router.get("/vendor/upcoming", verifyAuth, getVendorUpcomingBookingsController);

// @desc Add a booking
// @route /bookings/add
router.post("/add", verifyAuth, addBookingController);

// @desc Delete a booking
// @route /bookings/delete/:_id
router.delete("/delete/:_id", verifyAuth, deleteBookingController);

export default router;
