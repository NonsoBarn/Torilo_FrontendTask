export const calculateTimeDifference = (
  startTime: string,
  endTime: string
): string => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const diff = end.getTime() - start.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const formatTimeWithAMPM = (timeStr: string | null) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(" ");
  const [h, m] = time.split(":");
  let hours = h;
  const minutes = m;

  if (modifier?.toLowerCase() === "pm" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  if (modifier?.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
};

export const getCurrentTime24 = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const getDateString = () =>
  new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
