import clsx from "clsx";
import { Clock3 } from "lucide-react";
import React from "react";

function StatCard({ type, count = 0, icon }) {
  return (
    <div
      className={clsx(
        "bg-blue-400 flex flex-col  justify-between rounded-xl py-5 px-4 w-[350px] h-[130px]",
        {
          "bg-blue-400": type === "pending",
          "bg-green-400": type === "scheduled",
          "bg-red-400": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-white text-xl md:text-3xl font-semibold">
          {count}
        </span>
      </div>
      <p className="text-xs sm:text-sm font-medium text-white">
        The number of {type} appointments
      </p>
    </div>
  );
}

export default StatCard;
