"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForms";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar, FormInput } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
const RenderField = ({ field, props }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex border rounded-[0.60rem] !important items-center gap-1 pl-2">
          {props.iconSrc && props.iconSrc}
          <FormControl className="">
            <Input
              placeholder={props.placeHolder}
              {...field}
              className="border-0 w-full rounded-r-[0.60rem] placeholder-slate-400"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className="border-gray-200 border-[1px] rounded-[0.40rem] px-1 py-[0.11rem]"
            />
          </FormControl>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex flex-1 border rounded-[0.40rem] !important items-center gap-1 pl-2 ">
          <Calendar />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              className="custom-datepicker  w-full rounded-r-[0.60rem] bg-white py-2 text-black border-0 !important"
              style={{
                backgroundColor: "white",
                color: "black",
                border: "none",
                padding: "0.5rem",
                borderRadius: "0.60rem",
              }}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy "}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            onChange={field.onChange} // Change this line
            {...field}
            placeholder={props.placeHolder}
            className="rounded-[0.60rem] shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case "radio":
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="border-gray-200 rounded-[0.60rem]">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange} // Change this line
            />

            <label
              htmlFor={props.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};

function CustomFormField(props) {
  const {
    control,
    label,
    name,
    fieldType,
    placeHolder,
    iconSrc,
    renderSkeleton,
    timeShowSelect,
    dateFormat,
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className="shad-error text-xs" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
