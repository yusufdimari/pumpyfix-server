import Joi from "joi";
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    picture: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;

export const validateAddService = (data: unknown) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).trim().required().label("Title"),
    picture: Joi.string().min(3).max(1024).trim().required().label("Picture"),
  });

  return schema.validate(data);
};
