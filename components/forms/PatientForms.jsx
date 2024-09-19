"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../CustomFormField";
import { UserRound } from "lucide-react";
import { Mail } from "lucide-react";
import SubmitButton from "../SubmitButton";
import { userValidation } from "@/lib/validation";
import { createUser } from "@/lib/functionality";
import { useRouter } from "next/navigation";
export const FormFieldType = {
  INPUT: "input",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  DATE_PICKER: "datepicker",
  PHONE_INPUT: "phoneInput",
  SELECT: "select",
  SKELETON: "skeleton",
};

const PatientForms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true); // Start loading

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser && newUser.$id) {
        router.push(`patient/${newUser.$id}/register`);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <span className="mb-3 space-y-4">
          <h1 className="text-2xl font-semibold">Hello Dear 👋</h1>
          <p className="text-gray-600 text-xs">Reserve for a new appointment</p>
        </span>
        <CustomFormField
          control={form.control}
          name="name"
          label="Username"
          fieldType={FormFieldType.INPUT}
          placeHolder=""
          iconSrc={<UserRound className="text-gray-300" />}
        />
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          fieldType={FormFieldType.INPUT}
          placeHolder=""
          iconSrc={<Mail className="text-gray-300" />}
        />

        <CustomFormField
          control={form.control}
          name="phone"
          label="Phone"
          fieldType={FormFieldType.PHONE_INPUT}
          placeHolder="Your number goes here.."
          iconSrc={<Mail className="text-gray-300" />}
        />
        <SubmitButton isLoading={isLoading} title={"get started"} />
      </form>
    </FormProvider>
  );
};

export default PatientForms;
