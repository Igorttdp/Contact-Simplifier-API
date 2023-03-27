import express from "express";
import "reflect-metadata";
import "express-async-errors";
import { errorHandler } from "./errors";
import userRoutes from "./routers/user.routes";
import contactRoutes from "./routers/contacts.routes";

const app = express();
app.use(express.json());

app.use("", userRoutes);
app.use("", contactRoutes);

app.use(errorHandler);

export default app;
