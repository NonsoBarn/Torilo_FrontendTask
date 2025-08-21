import React, { useState } from "react";
import { ChevronDown, Gift, Briefcase, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";

type CelebrationType = "birthdays" | "anniversary" | "new_hire";

type Celebration = {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  icon: React.ComponentType<any>;
};

type CelebrationsMap = {
  birthdays: Celebration[];
  anniversary: Celebration[];
  new_hire: Celebration[];
};

const CelebrationsPanel = () => {
  const [activeTab, setActiveTab] = useState<CelebrationType>("birthdays");
  const [todayExpanded, setTodayExpanded] = useState(true);
  const [upcomingExpanded, setUpcomingExpanded] = useState(false);

  const celebrations: CelebrationsMap = {
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

  const tabs = [
    { key: "birthdays", label: "Birthdays" },
    { key: "anniversary", label: "Anniversary" },
    { key: "new_hire", label: "New Hire" },
  ];

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <div className="px-6 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Celebrations</h1>

        {/* Toggle Buttons */}
        <div className="bg-gray-100 rounded-full p-1.5 relative w-full -mt-5">
          <motion.div
            className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm"
            initial={false}
            animate={{
              left:
                activeTab === "birthdays"
                  ? "4px"
                  : activeTab === "anniversary"
                  ? "33.33%"
                  : "66.66%",
              width: "calc(33.33% - 4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <div className="relative flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as CelebrationType)}
                className="relative flex-1 px-3 py-3 rounded-full flex items-center justify-center font-medium text-xs z-10 transition-colors duration-200"
              >
                <span
                  className={
                    activeTab === tab.key ? "text-gray-900" : "text-gray-600"
                  }
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-2 -mt-0">
        {/* Today Section */}
        <div>
          <button
            onClick={() => setTodayExpanded(!todayExpanded)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-base font-medium">Today</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                todayExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <motion.div
            initial={false}
            animate={{
              height: todayExpanded ? "auto" : 0,
              opacity: todayExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {celebrations[activeTab].slice(0, 2).map((celebration, index) => {
                const Icon = celebration.icon;
                return (
                  <motion.div
                    key={celebration.id}
                    className="flex items-center gap-3 bg-blue-50 p-3.5 rounded-xl border border-blue-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                    }}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={celebration.user.avatar}
                        alt={celebration.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-0 leading-tight">
                        {celebration.user.name}
                      </h3>
                      <p className="text-gray-600 text-xs leading-tight">
                        {celebration.user.role}
                      </p>
                    </div>

                    {/* Icon and Date */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <Icon className="w-5 h-5 text-yellow-500" />
                      <span className="text-xs text-gray-500">
                        {celebration.date}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Section */}
        <div>
          <button
            onClick={() => setUpcomingExpanded(!upcomingExpanded)}
            className="flex items-center justify-between w-full text-left mb-3"
          >
            <span className="text-base font-medium">
              Upcoming{" "}
              {activeTab === "anniversary"
                ? "Anniversary"
                : activeTab === "new_hire"
                ? "New Hires"
                : "Birthdays"}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                upcomingExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <motion.div
            initial={false}
            animate={{
              height: upcomingExpanded ? "auto" : 0,
              opacity: upcomingExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="max-h-40 overflow-y-auto space-y-3">
              {celebrations[activeTab].length > 2 ? (
                celebrations[activeTab].slice(2).map((celebration, index) => {
                  const Icon = celebration.icon;
                  return (
                    <motion.div
                      key={celebration.id}
                      className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                      }}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <img
                          src={celebration.user.avatar}
                          alt={celebration.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-0 leading-tight">
                          {celebration.user.name}
                        </h3>
                        <p className="text-gray-600 text-xs leading-tight">
                          {celebration.user.role}
                        </p>
                      </div>

                      {/* Icon and Date */}
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-500" />
                        <span className="text-xs text-gray-500">
                          {celebration.date}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No upcoming {activeTab} this week
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Card>
  );
};

export default CelebrationsPanel;
