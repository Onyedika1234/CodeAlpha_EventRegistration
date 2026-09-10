import { Request, Response } from "express";
import prisma from "../utils/prisma.ts";

interface Registration {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  status: string;
}
export const registerEvent = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params; // Event id
    const { userId } = req.cookies; //UserID

    const eventExist = await prisma.event.findUnique({
      where: { id },
      include: { registrations: true },
    });

    if (!eventExist)
      res.status(404).json({ success: false, message: "Event not found." });

    if (eventExist?.registeredUsers >= eventExist?.capacity) {
      res.status(409).json({
        success: false,
        message: "Events is full already, try registering to another event.",
      });
    }

    const registrations: Registration[] = eventExist?.registrations;
    // const userRegistered = eventExist?.registrations?.filter(
    //   (r) => r.userId === userId,
    // );

    const userRegistered = registrations.filter((r) => r.userId == userId);

    if (userRegistered.length > 0)
      return res.status(400).json({
        success: false,
        message: "You have already registered for this event already",
      });

    const [registration, updatedEvent] = await prisma.$transaction([
      prisma.registration.create({
        data: {
          userId,
          eventId: id,
          status: "REGISTERED",
        },
      }),

      prisma.event.update({
        where: { id },
        data: {
          registeredUsers: eventExist?.registeredUsers + 1,
        },
      }),
    ]);

    res.status(201).json({ success: true, registration });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Errror" });
  }
};

export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies.userId;

    const registrations = await prisma.registration.findMany({
      where: { userId: userId },
      include: { event: true },
    });

    if (!registrations)
      res
        .status(404)
        .json({ success: false, message: "You have no open registrations" });

    res.status(200).json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
};
export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.cookies;
    const { id }: any = req.params; //RegistrationId Id

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration)
      res
        .status(404)
        .json({ success: false, message: "Registration Not found" });

    const deletedRegistration = await prisma.registration.delete({
      where: { id },
    });

    res
      .status(204)
      .json({ success: true, message: "Registrations deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};
