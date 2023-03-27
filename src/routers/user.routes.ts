import { Router } from "express";
import {
  createUserController,
  userProfileController,
  updateUserController,
  deleteUserController,
  loginUserController,
} from "../controllers/users";
import {
  ensureEmailIsValidMiddleware,
  validateSchemasMiddleware,
  ensureTokenIsValidMiddleware,
} from "../middlewares/index";
import { createUserRequestSchema } from "../schemas/createUser.schemas";
import loginUserSchema from "../schemas/loginUser.schemas";
import { updateUserRequestSchema } from "../schemas/updateUser.schemas";

const userRoutes = Router();

userRoutes.post(
  ["/register", "/users"],
  validateSchemasMiddleware(createUserRequestSchema),
  ensureEmailIsValidMiddleware,
  createUserController
);

userRoutes.post(
  "/login",
  validateSchemasMiddleware(loginUserSchema),
  loginUserController
);

userRoutes.get("/profile", ensureTokenIsValidMiddleware, userProfileController);

userRoutes.patch(
  "/profile",
  ensureTokenIsValidMiddleware,
  validateSchemasMiddleware(updateUserRequestSchema),
  updateUserController
);

userRoutes.delete(
  "/profile",
  ensureTokenIsValidMiddleware,
  deleteUserController
);

export default userRoutes;
