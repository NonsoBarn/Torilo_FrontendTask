import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "../../types";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = "md",
  showName = false,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-blue-500 text-white text-xs font-medium">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          {user.role && <p className="text-xs text-gray-500">{user.role}</p>}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
