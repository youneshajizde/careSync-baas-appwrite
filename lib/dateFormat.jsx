import React from "react";

const formatDateTime = (
  dateString,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    dateTimeOptions
  );
  const formattedTime = new Date(dateString).toLocaleTimeString(
    undefined,
    dateTimeOptions
  );

  return `${formattedDate}, ${formattedTime}`;
};

const DateTimeDisplay = ({ date, timeZone }) => {
  return <div>{formatDateTime(date, timeZone)}</div>;
};

export default DateTimeDisplay;
