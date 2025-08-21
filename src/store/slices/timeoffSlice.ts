import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeoffPolicy, TimeoffRequest } from "../../types";

interface TimeoffState {
  policies: TimeoffPolicy[];
  requests: TimeoffRequest[];
  loading: boolean;
}

const initialState: TimeoffState = {
  policies: [
    { type: "Annual", totalDays: 20, usedDays: 0, remainingDays: 20 },
    { type: "Sick", totalDays: 5, usedDays: 0, remainingDays: 5 },
    { type: "Personal", totalDays: 10, usedDays: 0, remainingDays: 10 },
  ],
  requests: [
    {
      id: "1",
      user: {
        id: "2",
        name: "John Micheal",
        email: "john@makay.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Leader Designer",
      },
      type: "Annual Leave",
      startDate: "Jan 23",
      endDate: "Jan 25, 2022",
      days: 2,
      status: "upcoming",
    },
    {
      id: "2",
      user: {
        id: "2",
        name: "John Micheal",
        email: "john@makay.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Leader Designer",
      },
      type: "Sick Leave",
      startDate: "Jan 23",
      endDate: "Jan 25, 2022",
      days: 2,
      status: "ongoing",
    },
    {
      id: "3",
      user: {
        id: "2",
        name: "John Doe",
        email: "john@makay.com",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Leader Designer",
      },
      type: "Sick Leave",
      startDate: "Jan 23",
      endDate: "Jan 25, 2022",
      days: 2,
      status: "ongoing",
    },
  ],
  loading: false,
};

const timeoffSlice = createSlice({
  name: "timeoff",
  initialState,
  reducers: {
    addTimeoffRequest: (state, action: PayloadAction<TimeoffRequest>) => {
      state.requests.push(action.payload);
    },
    updateTimeoffStatus: (
      state,
      action: PayloadAction<{ id: string; status: "upcoming" | "ongoing" }>
    ) => {
      const request = state.requests.find((r) => r.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
      }
    },
    updatePolicyUsage: (
      state,
      action: PayloadAction<{
        type: "Annual" | "Sick" | "Personal";
        daysUsed: number;
      }>
    ) => {
      const policy = state.policies.find((p) => p.type === action.payload.type);
      if (policy) {
        policy.usedDays += action.payload.daysUsed;
        policy.remainingDays = policy.totalDays - policy.usedDays;
      }
    },
  },
});

export const { addTimeoffRequest, updateTimeoffStatus, updatePolicyUsage } =
  timeoffSlice.actions;
export default timeoffSlice.reducer;
