import { Request, Response, NextFunction } from "express";
import { signUpDto, loginDto, eventDto } from "../utils/dtos.ts";

//Validation of Signup data
export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { name, email, password, role } = signUpDto(req.body);

  if (!name || !email || !password || !role) {
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });
  }
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof role !== "string"
  ) {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }

  name = name.trim();
  email = email.trim();
  password = password.trim();
  role = role.trim();

  next();
};

//Validation of Signup data
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { email, password } = loginDto(req.body);

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }
  email = email.trim();
  password = password.trim();
  next();
};

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { title, description, capacity, location, date } = eventDto(req.body);

  if (!title || !description || !capacity || !location || !date) {
    res
      .status(400)
      .json({ success: false, message: "Some Parameters are missing" });
  }

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof capacity !== "number" ||
    typeof location !== "string" ||
    typeof date !== "string"
  ) {
    res.status(422).json({
      success: false,
      message: "Parameters are of the wrong data type",
    });
  }

  title = title.trim();
  description = description.trim();
  location = location.trim();
  date = date.trim();

  next();
};
