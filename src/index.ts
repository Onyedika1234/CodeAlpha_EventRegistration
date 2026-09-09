import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.ts";
import eventRouter from "./routes/event.route.ts";
import { globalLimit } from "./utils/ratelimit.ts";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use(globalLimit);

app.use("/auth", authRouter);

app.use("/events", eventRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Event Registration Api");
});

app.use((req: Request, res: Response) =>
  res.status(404).json({ message: "Route not found..." }),
);

app.listen(process.env.PORT, () => console.log("Server running..."));
