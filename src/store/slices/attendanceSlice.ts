import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceRecord } from "../../types";
import { calculateTimeDifference } from "@/utils/timeUtils";

interface AttendanceState {
  currentAttendance: AttendanceRecord | null;
  attendanceHistory: AttendanceRecord[];
  isClockIn: boolean;
  workLocation: "Remote" | "On-Site";
  isOnBreak: boolean;
  breakStartTime: string | null;
  breakEndTime: string | null;
  totalBreakTime: string;
  lastClockInTime: string | null;
  lastClockOutTime: string | null;
}

const initialState: AttendanceState = {
  currentAttendance: null,
  attendanceHistory: [],
  isClockIn: false,
  workLocation: "Remote",
  isOnBreak: false,
  breakStartTime: null,
  breakEndTime: null,
  totalBreakTime: "00:00",
  lastClockInTime: null,
  lastClockOutTime: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clockIn: (state, action: PayloadAction<string>) => {
      state.isClockIn = true;
      state.isOnBreak = false;
      state.breakStartTime = null;
      state.breakEndTime = null;
      state.lastClockInTime = action.payload;

      if (state.currentAttendance) {
        state.currentAttendance.clockIn = action.payload;
        state.currentAttendance.status = "Present";
        state.currentAttendance.clockOut = "";
      }
    },

    clockOut: (state, action: PayloadAction<string>) => {
      state.isClockIn = false;
      state.isOnBreak = false;
      state.breakStartTime = null;
      state.breakEndTime = null;
      state.lastClockOutTime = action.payload;

      if (state.currentAttendance) {
        state.currentAttendance.clockOut = action.payload;

        // Calculate total hours worked
        if (state.currentAttendance.clockIn) {
          state.currentAttendance.totalHours = calculateTimeDifference(
            state.currentAttendance.clockIn,
            action.payload
          );
        }

        // Add to history
        state.attendanceHistory.push({ ...state.currentAttendance });
      }
    },

    setWorkLocation: (state, action: PayloadAction<"Remote" | "On-Site">) => {
      state.workLocation = action.payload;
      if (state.currentAttendance) {
        state.currentAttendance.workLocation = action.payload;
      }
    },

    startBreak: (state, action: PayloadAction<string>) => {
      if (state.isClockIn) {
        state.isOnBreak = true;
        state.breakStartTime = action.payload;
        state.breakEndTime = null;

        if (state.currentAttendance) {
          state.currentAttendance.status = "On Break";
        }
      }
    },

    endBreak: (state, action: PayloadAction<string>) => {
      if (state.isOnBreak && state.breakStartTime) {
        state.isOnBreak = false;
        state.breakEndTime = action.payload;

        // Calculate break duration and add to total break time
        const breakDuration = calculateTimeDifference(
          state.breakStartTime,
          action.payload
        );

        // Add this break duration to total break time
        const currentTotal = state.totalBreakTime;
        const [currentHours, currentMinutes] = currentTotal
          .split(":")
          .map(Number);
        const [breakHours, breakMinutes] = breakDuration.split(":").map(Number);

        const totalMinutes =
          currentHours * 60 + currentMinutes + (breakHours * 60 + breakMinutes);
        const newHours = Math.floor(totalMinutes / 60);
        const newMinutes = totalMinutes % 60;

        state.totalBreakTime = `${newHours
          .toString()
          .padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`;

        // Reset break times
        state.breakStartTime = null;
        state.breakEndTime = null;

        if (state.currentAttendance) {
          state.currentAttendance.status = "Present";
        }
      }
    },

    resetDailyAttendance: (state) => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      state.currentAttendance = {
        date: formattedDate,
        clockIn: "",
        clockOut: "",
        workLocation: state.workLocation,
        status: "Absent",
        totalHours: "00:00",
      };
      state.isClockIn = false;
      state.isOnBreak = false;
      state.breakStartTime = null;
      state.breakEndTime = null;
      state.totalBreakTime = "00:00";
      state.lastClockInTime = null;
      state.lastClockOutTime = null;
    },
  },
});

export const {
  clockIn,
  clockOut,
  setWorkLocation,
  startBreak,
  endBreak,
  resetDailyAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
