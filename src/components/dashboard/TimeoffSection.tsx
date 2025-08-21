import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { timeoffTypes } from "@/data";

const TimeoffDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  // useEffect Updating cards per view on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      setCurrentPage(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(timeoffTypes.length / cardsPerView);
  const startIndex = currentPage * cardsPerView;
  const visibleCards = timeoffTypes.slice(
    startIndex,
    startIndex + cardsPerView
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const dropdownOptions = [
    "Maternity Timeoff",
    "Paternity Timeoff",
    "Pet Time",
  ];

  const HalfMoonProgress = ({ value, color }) => {
    const radius = 50;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (value / 30) * circumference;

    return (
      <div className="relative">
        <svg
          height={radius + 10}
          width={radius * 2}
          className="overflow-visible"
        >
          <path
            d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
              radius * 2 - strokeWidth
            } ${radius}`}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />
          <path
            d={`M ${strokeWidth} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
              radius * 2 - strokeWidth
            } ${radius}`}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <div className="text-center">
            <div className="text-sm font-bold text-gray-900">{value}</div>
            <div className="text-xs sm:text-sm text-gray-600">Days</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-0 ">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between mb-6 sm:mb-8">
        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Timeoff
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative w-full sm:w-auto">
          <div
            className="flex w-full sm:w-auto"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2 bg-[#4069D0] text-white rounded-l-xl transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Request Other Timeoffs</span>
              <span className="sm:hidden">Request Timeoffs</span>
            </button>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#4069D0] text-white rounded-r-xl transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-full sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
            >
              {dropdownOptions.map((option, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Cards Container - Dynamic height and responsive grid */}
      <div className="relative overflow-hidden">
        <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[300px] w-full">
          <motion.div
            key={currentPage}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-0"
          >
            {visibleCards.map((timeoff, index) => (
              <motion.div
                key={timeoff.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <Card
                  className={`${timeoff.bgColor} p-3 sm:p-4 border border-gray-200 h-full min-h-[260px] sm:min-h-[280px]`}
                >
                  <div className="text-center space-y-2 h-full flex flex-col justify-between">
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 px-2">
                      {timeoff.title}
                    </h3>

                    {/* Half Moon Progress */}
                    <div className="flex flex-col justify-center flex-grow items-center py-2">
                      <HalfMoonProgress
                        value={timeoff.days}
                        color={timeoff.progressColor}
                      />
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 px-2">
                        {timeoff.subtitle}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="space-y-2 border-t-2 border-[#F2F2F2] pt-3">
                      {/* Request Button */}
                      <button
                        className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium transition-all duration-200 ${timeoff.buttonColor} transform hover:scale-105 text-xs sm:text-sm`}
                      >
                        {timeoff.buttonText}
                      </button>

                      {/* Policy Link */}
                      <button className="w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 bg-[#F2F2F2] transform hover:scale-105">
                        View Policy Details
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentPage ? "bg-gray-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </Card>
  );
};

export default TimeoffDashboard;
