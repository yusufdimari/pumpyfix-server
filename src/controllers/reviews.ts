import Review, { validateReview } from "@models/Review";
import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import Worker from "@models/Worker";

export const getHandymanReviewsController = async (req: Request, res: Response) => {
  const { workerId } = req.params;

  const isValidId = isValidObjectId(workerId);
  if (!isValidId) return res.status(400).json({ error: { message: "Invalid worker id" } });

  const worker = await Worker.findById(workerId);
  if (!worker) return res.status(404).json({ error: { message: "Worker not found" } });

  const reviews = await Review.find({ worker: workerId }).populate("customer worker");

  res.status(200).json({ data: { reviews, ratings: worker?.ratings } });
};

export const addHandymanReviewController = async (req: Request, res: Response) => {
  const { workerId, comment, rating } = req.body;
  const { _id: customerId } = req.user as { _id: string };

  const { error } = validateReview(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const isCusomerIdValid = isValidObjectId(customerId);
  const isWorkerIdValid = isValidObjectId(workerId);

  if (!isCusomerIdValid || !isWorkerIdValid)
    return res.status(400).json({ error: { message: "Invalid customer or worker" } });

  const updatedWorker = await Worker.updateOne(
    { _id: workerId },
    {
      $inc: {
        "ratings.count": 1,
        "ratings.overallRatings": rating,
      },
    },
    { new: true },
  );

  const newReview = await Review.create({ customer: customerId, worker: workerId, comment, rating });
  await newReview.save();

  res.status(201).json({ data: { message: "Review added successfully", worker: updatedWorker } });
};
