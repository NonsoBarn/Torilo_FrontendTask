import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  status:
    | "present"
    | "absent"
    | "late"
    | "pending"
    | "approved"
    | "rejected"
    | "upcoming"
    | "ongoing";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "absent":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "ongoing":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Badge
      variant="secondary"
      className={cn(getStatusStyles(status), className)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;
