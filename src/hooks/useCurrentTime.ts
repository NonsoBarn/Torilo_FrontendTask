import { useState, useEffect } from "react";
import { getCurrentTime24 } from "../utils/timeUtils";

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime24());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime24());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
