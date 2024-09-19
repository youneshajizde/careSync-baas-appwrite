"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomFormField from "../CustomFormField";
import { Calendar, Router, UserRound } from "lucide-react";
import { Mail } from "lucide-react";
import SubmitButton from "../SubmitButton";
import { PatientFormValidation, userValidation } from "@/lib/validation";
import { registerPatient } from "@/lib/functionality";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Doctors,
  IdentificationTypes,
  myGenders,
  PatientFormDefaultValues,
} from "@/customJson";
import { SelectItem } from "../ui/select";
import Image from "next/image";
export const FormFieldType = {
  INPUT: "input",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
  DATE_PICKER: "datepicker",
  PHONE_INPUT: "phoneInput",
  SKELETON: "radio",
  SELECT: "select",
};

const RegisterForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log("here is the user that is passed as a prop : ", user);
  const form = useForm({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSubmit = async (values) => {
    if (!user || !user.$id) {
      console.error("User is not defined or does not have an ID.");
      return; // Exit the function early if there's no valid user
    }

    setIsLoading(true);
    try {
      const patient = {
        userid: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        IdentificationTypes: values.IdentificationTypes,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
      };

      const newPatient = await registerPatient(patient);
      console.log("Patient registered successfully:", newPatient);
      if (newPatient) {
        router.push(`/patient/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.error("Error registering patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...form} className="mb-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12 "
      >
        <h1 className="text-2xl font-semibold">
          Please Register Your Information
        </h1>
        <CustomFormField
          control={form.control}
          name="name"
          label="Username"
          fieldType={FormFieldType.INPUT}
          placeHolder="Jonas Rivers"
          iconSrc={<UserRound className="text-gray-300" />}
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            fieldType={FormFieldType.INPUT}
            placeHolder="JonasRiver@gmail.com"
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="date"
            label="Birth Date"
            fieldType={FormFieldType.DATE_PICKER}
            iconSrc={<Calendar className="text-gray-300" />}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {myGenders.map((option, i) => (
                    <div
                      key={option + i}
                      className="radio-group flex items-center"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="ml-2 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
            fieldType={FormFieldType.INPUT}
            placeHolder=""
          />
          <CustomFormField
            control={form.control}
            name="occupation"
            label="Occupation"
            fieldType={FormFieldType.INPUT}
            placeHolder=""
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            fieldType={FormFieldType.INPUT}
            placeHolder=""
          />
          <CustomFormField
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            fieldType={FormFieldType.PHONE_INPUT}
            placeHolder=""
          />
        </div>
        <span className="space-y-4">
          <h1 className="text-2xl font-semibold mt-10">Medical Information</h1>
        </span>
        <CustomFormField
          control={form.control}
          name="primaryPhysician"
          label="Primary doctors"
          fieldType={FormFieldType.SELECT}
          placeHolder="Jonas Rivers"
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
        <div className="flex flex-col xl:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            fieldType={FormFieldType.INPUT}
            placeHolder=""
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            fieldType={FormFieldType.INPUT}
            placeHolder=""
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <CustomFormField
            control={form.control}
            name="allergies"
            label="Allergies"
            fieldType={FormFieldType.TEXTAREA}
            placeHolder="Write any"
          />
          <CustomFormField
            control={form.control}
            name="currentMedication"
            label="Current Medications"
            fieldType={FormFieldType.TEXTAREA}
            placeHolder=""
          />
        </div>
        <span className="space-y-4">
          <h1 className="text-2xl font-semibold mt-10">
            Identification And Verification
          </h1>
        </span>
        <CustomFormField
          control={form.control}
          name="IdentificationTypes"
          label="Identification Type"
          fieldType={FormFieldType.SELECT}
          placeHolder="Jonas Rivers"
        >
          {IdentificationTypes.map((type, i) => (
            <SelectItem key={i} value={type}>
              <div className="flex items-center cursor-pointer gap-2">
                <p>{type}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading} title={"Register"} />
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
