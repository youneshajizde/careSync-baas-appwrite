import clsx from "clsx";
import React from "react";

function StatusBadge({ status }) {
  return (
    <div
      className={clsx("status-badge text-white", {
        "bg-green-400": status === "scheduled",
        "bg-red-400": status === "cancelled",
        "bg-blue-400": status === "pending",
      })}
    >
      {status}
    </div>
  );
}

export default StatusBadge;
