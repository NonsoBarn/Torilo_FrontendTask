import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { mockRequests } from "@/data";

const TimeoffRecord = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const statusCounts = mockRequests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredRequests = mockRequests.filter(
    (req) => req.status === activeTab
  );
  const upcomingCount = statusCounts.upcoming || 0;
  const ongoingCount = statusCounts.ongoing || 0;

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <div className="px-8 py-6 ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Timeoff Record</h1>
          <button className="text-cyan-500 font-medium text-sm hover:text-cyan-600 transition-colors">
            View All Record
          </button>
        </div>

        {/* Toggle Buttons */}
        <div className="bg-gray-100 rounded-full p-1 relative w-full">
          <motion.div
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
            initial={false}
            animate={{
              left: activeTab === "upcoming" ? "4px" : "50%",
              width:
                activeTab === "upcoming"
                  ? "calc(50% - 4px)"
                  : "calc(50% - 4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
          <div className="relative flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className="relative flex-1 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium text-sm z-10 transition-colors duration-200"
            >
              <span
                className={
                  activeTab === "upcoming" ? "text-gray-900" : "text-gray-600"
                }
              >
                Upcoming
              </span>
              {upcomingCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {upcomingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className="relative flex-1 px-6 py-3 rounded-full flex items-center justify-center gap-2 font-medium text-sm z-10 transition-colors duration-200"
            >
              <span
                className={
                  activeTab === "ongoing" ? "text-gray-900" : "text-gray-600"
                }
              >
                Ongoing
              </span>
              {ongoingCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {ongoingCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content with scroll */}
      <div className="px-8 pb-6 max-h-[20rem] overflow-y-auto">
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No {activeTab} timeoff requests
            </div>
          ) : (
            filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                className="flex flex-col items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <div className="flex flex-row justify-between w-full border-b-[1px] border-[#FDEDCE] pb-2">
                  {/* Left Section */}
                  <div className="flex flex-row gap-2 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-md font-semibold text-gray-900 mb-0">
                        {request.user.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-2">
                        {request.user.role}
                      </p>
                    </div>
                  </div>

                  {/* Days Badge */}
                  <div className="flex-shrink-0">
                    <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      ({request.days} Days)
                    </span>
                  </div>
                </div>

                <div className="text-gray-600 text-xs">
                  <span>Start Date: {request.startDate}</span>
                  <span className="mx-2">|</span>
                  <span>End Date: {request.endDate}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {filteredRequests.length > 3 && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1 bg-gray-200 rounded-full h-24 opacity-50">
          <div className="w-full bg-gray-400 rounded-full h-8"></div>
        </div>
      )}
    </Card>
  );
};

export default TimeoffRecord;
