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

export interface TimeoffPolicy {
  type: "Annual" | "Sick" | "Personal";
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}

export interface Benefit {
  id: string;
  name: string;
  provider: string;
  dependents: number;
  websiteUrl: string;
  icon: string;
  color: string;
}

export interface Celebration {
  id: string;
  user: User;
  type: "birthday" | "anniversary" | "new_hire";
  date: string;
  icon: string;
}

export interface TimeoffRequest {
  id: string;
  user: User;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "upcoming" | "ongoing";
}

export interface TeamMember extends User {
  position: string;
}
