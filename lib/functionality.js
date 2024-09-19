import { ID, Query } from "node-appwrite";
import {
  databases,
  NEXT_PUBLIC_DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
  users,
} from "@/appwrite.config";
import { parseStringify } from "./utils";
import { revalidatePath } from "next/cache";

export const createUser = async (user) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return newUser;
  } catch (error) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
export const getUser = async (userId) => {
  try {
    const user = await users.get(userId);
    console.log("User fetched:", user);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const registerPatient = async (patient) => {
  try {
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("Error creating patient document:", error);
    throw error; // Rethrow the error to be caught in the onSubmit
  }
};

export const getPatient = async (userid) => {
  try {
    const patients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,
      [Query.equal("userid", [userid])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const createAppointment = async (appointment) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      ID.unique(),
      {
        ...appointment,
      }
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      [Query.orderDesc("$createdAt")],
      { cache: false } // Check if this option exists
    );

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.documents.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduleCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1; // Fixed typo here
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return data; // Assuming `parseStringify` was meant for serialization; it's not needed here unless for a specific reason.
  } catch (error) {
    console.error("Error fetching appointments:", error); // Log the error for debugging
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("appointment not found");
    }

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {}
};

export const getAppointment = async (appointmentId) => {
  try {
    const appointment = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};
