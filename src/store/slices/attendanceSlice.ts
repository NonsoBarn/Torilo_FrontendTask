import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceState } from "../../types";
import { calculateTimeDifference } from "@/utils/timeUtils";

const initialState: AttendanceState = {
  currentAttendance: null,
  attendanceHistory: [],
  isClockIn: false,
  workLocation: "Remote",
  isOnBreak: false,
  breakStartTime: null,
  breakEndTime: null,
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

        // Calculating total hours worked (Just incase employees total daily working hours needs to be tracked or displayed)
        if (state.currentAttendance.clockIn) {
          state.currentAttendance.totalHours = calculateTimeDifference(
            state.currentAttendance.clockIn,
            action.payload
          );
        }

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

        // Reseting break times
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
