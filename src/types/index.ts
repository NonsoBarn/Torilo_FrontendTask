import React from "react";
import { LucideIcon } from "lucide-react";
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department?: string;
}

export interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut: string;
  workLocation: "Remote" | "On-Site";
  status: "Present" | "Absent" | "Late" | "On Break";
  totalHours: string;
}

export interface TaskItem {
  id: string;

  description: string;
  date: string;

  action?: string;
  comment?: string;
}

// export interface TimeoffPolicy {
//   type: "Annual" | "Sick" | "Personal";
//   totalDays: number;
//   usedDays: number;
//   remainingDays: number;
// }

// export interface Benefit {
//   id: string;
//   name: string;
//   provider: string;
//   dependents: number;
//   websiteUrl: string;
//   icon: string;
//   color: string;
// }

// export interface Celebration {
//   id: string;
//   user: User;
//   type: "birthday" | "anniversary" | "new_hire";
//   date: string;
//   icon: string;
// }

// export interface TeamMember extends User {
//   position: string;
// }

// ------Celebration-----
export type CelebrationType = "birthdays" | "anniversary" | "new_hire";

export type Celebration = {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  icon: React.ComponentType<any>;
};

export type CelebrationsMap = {
  birthdays: Celebration[];
  anniversary: Celebration[];
  new_hire: Celebration[];
};

// -------Attendance -------

export interface AttendanceData {
  daysPresent: number;
  unauthorizedAbsent: number;
  totalPerformance: number;
}

export interface AttendanceState {
  currentAttendance: AttendanceRecord | null;
  attendanceHistory: AttendanceRecord[];
  isClockIn: boolean;
  workLocation: "Remote" | "On-Site";
  isOnBreak: boolean;
  breakStartTime: string | null;
  breakEndTime: string | null;
  lastClockInTime: string | null;
  lastClockOutTime: string | null;
}

export interface AttendanceSnapshotProps {
  punctualityData?: AttendanceData;
  attendanceData?: AttendanceData;
  month?: string;
}

// --- Mock Requests ---

export type MockRequest = {
  id: number;
  user: User;
  startDate: string;
  endDate: string;
  days: number;
  status: "upcoming" | "ongoing";
};

// --- Time-off Types ---
export type TimeoffType = {
  id: number;
  title: string;
  days: number;
  subtitle: string;
  buttonColor: string;
  buttonText: string;
  progressColor: string;
  bgColor: string;
};

// --- Benefits ---
export type Benefit = {
  id: string;
  name: string;
  provider: string;
  dependents: number;
  icon: LucideIcon;
  colorBg: string;
  colorIcon: string;
  linkBg: string;
  linkColor: string;
};

// --- Team Members ---
export type TeamMember = {
  id: string;
  name: string;
  position: string;
  avatar: string;
};
