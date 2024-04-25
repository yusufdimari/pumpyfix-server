import Booking, { validateAddBooking } from "@models/Booking";
import Service from "@models/Service";
import Worker from "@models/Worker";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const getBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ userId: _id }).populate("service worker userId").sort({ createdAt: -1 });
  res.status(200).json({ data: bookings });
};

export const getWorkersBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ worker: _id }).populate("service worker userId").sort({ createdAt: -1 });
  res.status(200).json({ data: bookings });
};

export const getUpcomingBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ userId: _id, status: "upcoming" })
    .populate("service worker userId")
    .sort({ createdAt: -1 });
  res.status(200).json({ data: bookings });
};

export const getAllVendorBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ worker: _id }).populate("service worker userId").sort({ createdAt: -1 });
  res.status(200).json({ data: bookings });
};

export const getVendorUpcomingBookingsController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };

  const bookings = await Booking.find({ worker: _id, status: "upcoming" })
    .populate("service worker userId")
    .sort({ createdAt: -1 });
  res.status(200).json({ data: bookings });
};

export const addBookingController = async (req: Request, res: Response) => {
  const { serviceId, status, workerId } = req.body;

  const { error } = validateAddBooking(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const isValidObjectId = mongoose.Types.ObjectId.isValid(serviceId) && mongoose.Types.ObjectId.isValid(workerId);
  if (!isValidObjectId) return res.status(400).json({ error: { message: "Service or worker does not exist" } });

  const serviceExists = await Service.findById(serviceId);
  if (!serviceExists) return res.status(404).json({ error: { message: "Service does not exist" } });

  const workerExists = await Worker.findById(workerId);
  if (!workerExists) return res.status(404).json({ error: { message: "Worker does not exist" } });

  const { _id: userId } = req.user as { _id: string };
  const booking = await Booking.create({ service: serviceId, worker: workerId, userId, status });

  res.status(201).json({ data: booking });
};

export const deleteBookingController = async (req: Request, res: Response) => {
  const { _id } = req.params;

  await Booking.deleteOne({ _id });
  res.status(200).json({ data: { message: "Deleted successfully." } });
};
