import Worker, { validateWorker } from "@models/Worker";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { isValidObjectId } from "mongoose";
import Service from "@models/Service";

export const getAllWorkersController = async (req: Request, res: Response) => {
  const workers = await Worker.find().populate("serviceOffered.service");

  res.status(200).json({ data: workers });
};

export const getWorkerInformationController = async (req: Request, res: Response) => {
  const { _id } = req.user as { _id: string };
  const worker = await Worker.findOne({ _id })
    .select(["-password", "-updatedAt", "-createdAt"])
    .populate("serviceOffered.service");

  res.status(200).json({ data: worker });
};

export const getWorkersByServiceOfferedController = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const serviceIdValid = isValidObjectId(serviceId);
  if (!serviceIdValid) return res.status(400).json({ error: { message: "Invalid service ID" } });

  const workers = await Worker.find({ "serviceOffered.service": serviceId }).populate("serviceOffered.service");

  res.status(200).json({ data: workers });
};

export const addWorkerController = async (req: Request, res: Response) => {
  const { email, password, serviceOffered } = req.body;

  const { error } = validateWorker(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const workerExists = await Worker.findOne({ email });
  if (workerExists) return res.status(400).json({ error: { message: "Worker with this email already exists" } });

  const serviceIdValid = isValidObjectId(serviceOffered.serviceId);
  if (!serviceIdValid) return res.status(400).json({ error: { message: "Invalid service ID" } });

  const serviceExists = await Service.findById(serviceOffered.serviceId);
  if (!serviceExists) return res.status(404).json({ error: { message: "Service not found" } });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const worker = await Worker.create({
    ...req.body,
    password: hashedPassword,
    serviceOffered: { ...serviceOffered, service: serviceOffered.serviceId },
  });
  res.status(201).json({ data: { message: "Worker created successfully", worker } });
};
