import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { endBreak } from "@/store/slices/attendanceSlice";
// import { getCurrentTime24 } from "@/utils/timeUtils";

export const useBreakTimer = (isOnBreak: boolean) => {
  const dispatch = useDispatch();
  const [breakTimer, setBreakTimer] = useState(60);
  const breakIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOnBreak) {
      setBreakTimer(60);
      breakIntervalRef.current = setInterval(() => {
        setBreakTimer((prev) => {
          if (prev <= 1) {
            clearInterval(breakIntervalRef.current!);
            dispatch(
              endBreak(
                new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              )
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
    }

    return () => {
      if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
    };
  }, [isOnBreak, dispatch]);

  return breakTimer;
};
