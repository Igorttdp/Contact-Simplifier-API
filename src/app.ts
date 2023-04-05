import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { errorHandler } from "./errors";
import userRoutes from "./routers/user.routes";
import contactRoutes from "./routers/contacts.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://contact-simplifier.vercel.app", "localhost:3000"],
    credentials: true,
  })
);

app.use("", userRoutes);
app.use("", contactRoutes);

app.use(errorHandler);

export default app;
