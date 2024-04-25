import "module-alias/register";
import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { authRoutes, bookingsRoutes, reviewsRoutes, servicesRoutes, usersRoutes, workersRoutes } from "@routes/index";

config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err: unknown) => console.log("Could not connect to DB...", err));

app.get("/healthz", (req: Request, res: Response) => {
  res.send("Server up and running...");
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/services", servicesRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/workers", workersRoutes);
app.use("/reviews", reviewsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
