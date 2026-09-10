import express, { Router } from "express";
import {
  deleteRegistration,
  getRegistrations,
} from "../controllers/registration.controller.ts";
import { authorize } from "../middlewares/auth.middleware.ts";

const registerRouter: Router = express.Router();

registerRouter.get("/", authorize, getRegistrations);

registerRouter.delete("/:id", authorize, deleteRegistration);
export default registerRouter;
