"use client"; // Ensure this is for client-side rendering

import React, { useState, useEffect } from "react";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/functionality";
import { CalendarCheck, Clock3, TriangleAlert, Undo2 } from "lucide-react";
import Link from "next/link";
import { Audio } from "react-loader-spinner";

const AdminPage = () => {
  const [appointments, setAppointments] = useState({
    pendingCount: 0,
    cancelledCount: 0,
    scheduleCount: 0,
    documents: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getRecentAppointmentList();
        setAppointments(data);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [appointments]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl flex flex-col mx-auto space-y-10 p-5">
      <header className="w-full flex items-center justify-between mt-4">
        <h1 className="text-xl sm:text-2xl  font-semibold">
          Welcome to your Dashboard
        </h1>
        <Link href={"/"}>
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Undo2 />
            Go back
          </h4>
        </Link>
      </header>

      <div className="flex items-center justify-between gap-4">
        <StatCard
          count={appointments.pendingCount}
          type={"pending"}
          icon={<Clock3 className="w-6 h-6 sm:w-9 sm:h-9 text-white" />}
        />
        <StatCard
          count={appointments.cancelledCount}
          type={"cancelled"}
          icon={<CalendarCheck className="w-6 h-6 sm:w-9 sm:h-9 text-white" />}
        />
        <StatCard
          count={appointments.scheduleCount}
          type={"scheduled"}
          icon={<TriangleAlert className="w-6 h-6 sm:w-9 sm:h-9 text-white" />}
        />
      </div>

      <div>
        <DataTable columns={columns} data={appointments.documents} />
      </div>
    </div>
  );
};

export default AdminPage;
