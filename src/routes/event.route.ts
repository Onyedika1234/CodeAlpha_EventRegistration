import express, { Router } from "express";
import {
  authorize,
  authroizeOrganizer,
  rbac,
} from "../middlewares/auth.middleware.ts";
import { validateEvent } from "../middlewares/validate.middleware.ts";
import {
  createEvent,
  editEvent,
  getEvent,
  getEvents,
} from "../controllers/event.controller.ts";
import { registerEvent } from "../controllers/registration.controller.ts";

const eventRouter: Router = express.Router();

//create event
eventRouter.post("/", authorize, rbac, validateEvent, createEvent);

//Get all events.
eventRouter.get("/", authorize, getEvents);

//Get specific event
eventRouter.get("/:id", authorize, getEvent);

//Edit Event
eventRouter.put(
  "/:id",
  authorize,
  authroizeOrganizer,
  validateEvent,
  editEvent,
);

//Register

eventRouter.post("/:id/register", authorize, registerEvent);

export default eventRouter;
