import Joi from "joi";
import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 255,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 11,
      trim: true,
      unique: true,
    },
    serviceOffered: {
      type: {
        description: {
          type: String,
          required: true,
          trim: true,
        },
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
      },
      required: true,
    },
    ratings: {
      type: {
        count: {
          type: Number,
          required: true,
        },
        overallRatings: {
          type: Number,
          required: true,
        },
      },
      default: {
        count: 0,
        overallRatings: 0,
      },
    },
    chargePerHour: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        coordinates: {
          longitude: {
            type: String,
            required: true,
          },
          latitude: {
            type: String,
            required: true,
          },
        },
        address: {
          type: String,
          required: true,
          trime: true,
          maxlength: 1000,
        },
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      trim: true,
    },
  },
  { timestamps: true },
);

const Worker = mongoose.model("Worker", workerSchema);

export const validateWorker = (data: unknown) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(255).required().label("First name"),
    lastName: Joi.string().trim().min(2).max(255).required().label("Last name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().trim().min(6).max(255).required().label("Password"),
    phoneNumber: Joi.string()
      .regex(/^[0-9]{11}$/)
      .messages({ "string.pattern.base": `Phone number must be 11 digits.` })
      .required()
      .label("Phone number"),
    chargePerHour: Joi.number().min(1).max(1_000_000).required().label("Charge Per Hour"),
    serviceOffered: Joi.object({
      description: Joi.string().trim().required().label("Service description"),
      serviceId: Joi.string().trim().required().label("Service ID"),
    })
      .required()
      .label("Service offered"),
    location: Joi.object({
      coordinates: Joi.object({
        latitude: Joi.number().required().label("Latitude"),
        longitude: Joi.number().required().label("Longitude"),
      })
        .required()
        .label("Coordinates"),
      address: Joi.string().trim().max(1000).required().label("Address"),
    })
      .required()
      .label("Location"),
  });

  return schema.validate(data);
};

export default Worker;
