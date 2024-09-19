"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "../StatusBadge";
import Image from "next/image";
import { Doctors } from "@/customJson";
import AppointmentModal from "../AppointmentModal";
import { formatDate } from "@/lib/utils";
// This is the shape of our data.
export const columns = [
  {
    header: "ID",
    cell: ({ row }) => <p>{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => <p>{row.original.patient?.name}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => <p>{formatDate(row.original.schedule)}</p>,
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const theDoctor = Doctors.find(
        (doc) => row.original.primaryPhysician === doc.name
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={theDoctor?.image}
            alt=""
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{theDoctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <p className="pl-4">Actions</p>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patient?.$id}
            appointment={row.original}
            userId={row.original.userId}
            title="Schedule Appointment"
            description="Please confirm the fowllowing details to schedule"
          />

          <AppointmentModal
            patientId={row.original.patient?.$id}
            userId={row.original.userId}
            appointment={row.original}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];
