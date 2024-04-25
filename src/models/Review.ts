import Joi from "joi";
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("Review", reviewSchema);

export const validateReview = (data: unknown) => {
  const schema = Joi.object({
    workerId: Joi.string().trim().required().label("Worker ID"),
    comment: Joi.string().max(1000).required().label("Comment"),
    rating: Joi.number().min(1).max(5).required().label("Rating"),
  });

  return schema.validate(data);
};

export default Review;
