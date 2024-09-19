"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { getAppointmentSchema, ScheduleAppointment } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Doctors } from "@/customJson";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment, updateAppointment } from "@/lib/functionality";
export const FormFieldType = {
  INPUT: "input",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  DATE_PICKER: "datepicker",
  PHONE_INPUT: "phoneInput",
  SELECT: "select",
  SKELETON: "skeleton",
};

const AppointmentForms = ({
  userId,
  patientId,
  type,
  setOpen,
  appointment,
}) => {
  console.log("patient id", patientId);
  console.log(userId, patientId, type);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });
  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  const onSubmit = async (values) => {
    setIsLoading(true); // Start loading

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create") {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason,
          note: values.note,
          schedule: new Date(values.schedule),
          status: status,
          cancellationReason: values.cancellationReason,
        };
        const newAppointment = await createAppointment(appointment);
        console.log("Appointment syringe:", newAppointment);

        if (newAppointment) {
          router.push(
            `/patient/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-6">
        <span className="mb-3 space-y-4">
          <h1 className="text-2xl font-semibold">
            {type === "create" && "Request Your Appointment"}
          </h1>
        </span>

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              name="primaryPhysician"
              label="Doctors"
              fieldType={FormFieldType.SELECT}
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            <CustomFormField
              control={form.control}
              name="reason"
              label="Reason for appointment"
              fieldType={FormFieldType.TEXTAREA}
              placeHolder="Write any"
            />
            <CustomFormField
              control={form.control}
              name="note"
              label="Note"
              fieldType={FormFieldType.TEXTAREA}
              placeHolder=""
            />
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            fieldType={FormFieldType.TEXTAREA}
            placeHolder="For personal reasons"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          title={buttonLabel}
          className={`${type === "cancel" ? "button-danger" : "button-accept"}`}
        />
      </form>
    </FormProvider>
  );
};

export default AppointmentForms;
