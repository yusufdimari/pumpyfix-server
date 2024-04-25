import Joi from "joi";
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    service: {
      ref: "Service",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "cancelled", "upcoming"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);

export const validateAddBooking = (data: unknown) => {
  const schema = Joi.object({
    serviceId: Joi.string().required().label("User ID"),
    workerId: Joi.string().required().label("Worker ID"),
    status: Joi.string().label("Status"),
  });

  return schema.validate(data);
};

export default Booking;
