import { useDispatch } from "react-redux";
import {
  clockIn,
  clockOut,
  setWorkLocation,
  startBreak,
  endBreak,
} from "@/store/slices/attendanceSlice";
import { getCurrentTime24 } from "../utils/timeUtils";

export const useAttendanceActions = () => {
  const dispatch = useDispatch();

  const handleClockIn = () => {
    dispatch(clockIn(getCurrentTime24()));
  };

  const handleClockOut = (customTime?: string) => {
    const time = customTime || getCurrentTime24();
    dispatch(clockOut(time));
  };

  const handleStartBreak = () => {
    dispatch(startBreak(getCurrentTime24()));
  };

  const handleEndBreak = () => {
    dispatch(endBreak(getCurrentTime24()));
  };

  const handleLocationChange = (location: "Remote" | "On-Site") => {
    dispatch(setWorkLocation(location));
  };

  return {
    handleClockIn,
    handleClockOut,
    handleStartBreak,
    handleEndBreak,
    handleLocationChange,
  };
};
