import {
  TaskItem,
  CelebrationsMap,
  MockRequest,
  TimeoffType,
  Benefit,
  TeamMember,
} from "@/types";
import { Gift, Briefcase, UserPlus, DollarSign, Heart } from "lucide-react";

export const tasks: TaskItem[] = [
  {
    id: "1",
    description: "Create the New Onboarding Process",
    date: "Today",
    action: "Mark Completed",
    comment: "Review with HR department.",
  },
  {
    id: "2",
    description: "Add New Employee",
    date: "Today",
    action: "Mark Completed",
  },
  {
    id: "3",
    description: "Create New Design",
    date: "Today",
    action: "Mark Completed",
  },
];

export const mockRequests: MockRequest[] = [
  {
    id: 1,
    user: {
      id: "user-1",
      email: "john.micheal@example.com",
      name: "John Micheal",
      role: "Leader Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    startDate: "Jan 23",
    endDate: "Jan 25, 2022",
    days: 2,
    status: "upcoming",
  },
  {
    id: 2,
    user: {
      id: "user-2",
      email: "john.micheal@example.com",
      name: "John Micheal",
      role: "Leader Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    startDate: "Jan 23",
    endDate: "Jan 25, 2022",
    days: 2,
    status: "upcoming",
  },
  {
    id: 3,
    user: {
      id: "user-3",
      email: "john.micheal@example.com",
      name: "John Micheal",
      role: "Leader Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    startDate: "Jan 23",
    endDate: "Jan 25, 2022",
    days: 2,
    status: "upcoming",
  },
  {
    id: 4,
    user: {
      id: "user-4",
      email: "john.micheal@example.com",
      name: "John Micheal",
      role: "Leader Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    startDate: "Jan 23",
    endDate: "Jan 25, 2022",
    days: 2,
    status: "ongoing",
  },
  {
    id: 5,
    user: {
      id: "user-5",
      email: "john.micheal@example.com",
      name: "John Micheal",
      role: "Leader Designer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    startDate: "Jan 23",
    endDate: "Jan 25, 2022",
    days: 2,
    status: "ongoing",
  },
];

export const timeoffTypes: TimeoffType[] = [
  {
    id: 1,
    title: "Annual Timeoff",
    days: 20,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-blue-500",
    bgColor: "bg-white",
  },
  {
    id: 2,
    title: "Sick Timeoff",
    days: 28,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-cyan-100 text-cyan-600 hover:bg-cyan-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-cyan-500",
    bgColor: "bg-white",
  },
  {
    id: 3,
    title: "Timeoff",
    days: 10,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-green-100 text-green-600 hover:bg-green-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-green-500",
    bgColor: "bg-white",
  },
  {
    id: 4,
    title: "Remote Work",
    days: 15,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-orange-100 text-orange-600 hover:bg-orange-200",
    buttonText: "Request",
    progressColor: "stroke-orange-500",
    bgColor: "bg-white",
  },
  // Second page of cards
  {
    id: 5,
    title: "Maternity Leave",
    days: 12,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-purple-500",
    bgColor: "bg-white",
  },
  {
    id: 6,
    title: "Paternity Leave",
    days: 8,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-indigo-500",
    bgColor: "bg-white",
  },
  {
    id: 7,
    title: "Pet Care",
    days: 30,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-pink-100 text-pink-600 hover:bg-pink-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-pink-500",
    bgColor: "bg-white",
  },
  {
    id: 8,
    title: "Study Leave",
    days: 10,
    subtitle: "Paid Timeoff",
    buttonColor: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
    buttonText: "Request Timeoff",
    progressColor: "stroke-yellow-500",
    bgColor: "bg-white",
  },
];

export const celebrations: CelebrationsMap = {
  birthdays: [
    {
      id: "1",
      user: {
        name: "John Micheal",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Leader Designer",
      },
      date: "Jan 23",
      icon: Gift,
    },
    {
      id: "2",
      user: {
        name: "John Micheal",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "Leader Designer",
      },
      date: "Jan 23",
      icon: Gift,
    },
    {
      id: "3",
      user: {
        name: "Nonso Barn",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "Front End Engineer",
      },
      date: "Mar 9",
      icon: Gift,
    },
  ],
  anniversary: [
    {
      id: "3",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        role: "Product Manager",
      },
      date: "Jan 25",
      icon: Briefcase,
    },
  ],
  new_hire: [
    {
      id: "4",
      user: {
        name: "Mike Wilson",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        role: "Developer",
      },
      date: "Jan 24",
      icon: UserPlus,
    },
  ],
};

export const benefits: Benefit[] = [
  {
    id: "1",
    name: "Family Healthcare Plan",
    provider: "Leadway & Associates",
    dependents: 3,
    icon: Heart,
    colorBg: "bg-blue-100",
    colorIcon: "text-blue-600",
    linkBg: "bg-blue-50",
    linkColor: "text-blue-600",
  },
  {
    id: "2",
    name: "Leadway Pension",
    provider: "Leadway & Associates",
    dependents: 1,
    icon: DollarSign,
    colorBg: "bg-red-100",
    colorIcon: "text-red-600",
    linkBg: "bg-red-50",
    linkColor: "text-red-600",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Micheal",
    position: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "John Micheal",
    position: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "John Micheal",
    position: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "John Micheal",
    position: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "John Micheal",
    position: "Founder",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];
