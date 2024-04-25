import Booking from "@models/Booking";
import Service, { validateAddService } from "@models/Service";
import { Request, Response } from "express";

export const getAllServicesController = async (req: Request, res: Response) => {
  const services = await Service.find();
  return res.status(200).json({ data: services });
};

export const addServiceController = async (req: Request, res: Response) => {
  const { title, picture } = req.body;

  const { error } = validateAddService(req.body);
  if (error) return res.status(400).json({ error: { message: error.details[0].message } });

  const serviceExists = await Service.findOne({ title: title.toLowerCase() });
  if (serviceExists) return res.status(400).json({ error: { message: "Service already exists" } });

  const service = await Service.create({ title, picture });
  const saved = await service.save();

  return res.status(201).json({ data: saved });
};

export const addMultipleServices = async (req: Request, res: Response) => {
  const services = req.body;

  const savedServices = await Service.insertMany(services);

  return res.status(201).json({ data: savedServices });
};

export const getMostBookedServicesController = async (req: Request, res: Response) => {
  const docs = await Booking.aggregate([
    {
      $group: {
        // Each `_id` must be unique, so if there are multiple
        // documents with the same age, MongoDB will increment `count`.
        _id: "$service",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const data = [];
  for (let i = 0; i < docs.length; i++) {
    const service = await Service.findById(docs[i]._id);

    data.push({
      _id: service?._id,
      title: service?.title,
      picture: service?.picture,
      count: docs[i].count,
    });
  }

  res.status(200).json({ data });
};
