import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Bell, Home, Grid3x3, HelpCircle, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const navItems = [
    "Home",
    "People",
    "Time off",
    "Training",
    "Benefits",
    "Documents",
    "Tasks",
    "Attendance",
    "Payslips",
    "Assets",
    "Shift Rota",
    "Performance Review",
    "Settings",
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">MAKAY</span>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Home className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Grid3x3 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-[#FDEDCE]  font-semibold text-[#C58607]">
                W
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Items - Hidden on mobile, scrollable on tablet */}
        <div className="hidden lg:flex space-x-[2.9rem] pb-3 overflow-x-auto">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`text-sm font-medium pb-3 border-b-2 transition-colors whitespace-nowrap ${
                index === 0
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
