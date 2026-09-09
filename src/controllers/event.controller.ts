import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";
import { eventDto } from "../utils/dtos.ts";
export const createEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let { title, description, capacity, location, date } = eventDto(req.body);
    const userId = req.cookies.userId;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        capacity,
        location,
        date,
        organizerId: userId,
      },
      include: {
        organizer: true,
      },
    });

    res.status(201).json({ success: true, event: event });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: `Internal Server Error ${error}` });
  }
};

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title }: any = req.query;
    const events = await prisma.event.findMany({
      where: {
        title: { contains: title },
      },
    });

    res
      .status(200)
      .json({ success: true, events: events.map((event) => eventDto(event)) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params; //Event Id

    const event = await prisma.event.findUnique({ where: { id } });

    if (!event)
      res.status(404).json({ success: false, message: "Event Not Found" });

    res.status(200).json({ success: true, event: eventDto(event) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const userId = req.cookies.userId;
    let { title, description, capacity, location, date } = eventDto(req.body);

    const newEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        capacity,
        location,
        date,
        organizerId: userId,
      },
    });

    res.status(201).json({ success: true, updatedEvent: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
