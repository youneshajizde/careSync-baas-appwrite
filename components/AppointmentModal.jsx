"use-client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AppointmentForms from "./forms/AppointmentForms";
function AppointmentModal({ type, userId, patientId, appointment }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white h-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Schedule the patient</DialogTitle>
          <DialogDescription>
            You can do some changes with the patient appointment or just leaving
            it be
          </DialogDescription>
        </DialogHeader>

        <AppointmentForms
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentModal;
