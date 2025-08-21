import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import { Button } from "./button";

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="p-1">{children}</div>;

export const DropdownMenuItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => (
  <button
    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
    onClick={onClick}
  >
    {children}
  </button>
);
