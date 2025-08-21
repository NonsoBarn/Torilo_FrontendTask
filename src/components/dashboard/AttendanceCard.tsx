import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Hourglass } from "lucide-react";
import Modal from "../common/Modal";

// Custom Hooks
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useBreakTimer } from "@/hooks/useBreakTimer";
import { useModalState } from "@/hooks/useModalState";
import { useAttendanceActions } from "@/hooks/useAttendanceAction";

// Utils
import { formatDate } from "../../utils/timeUtils";
import { getDateString } from "../../utils/timeUtils";
import { getModalConfig } from "../../utils/modalConfig";
import { formatLastClockActivity } from "../../utils/attendanceHelpers";

const AttendanceCard: React.FC = () => {
  const {
    currentAttendance,
    isClockIn,
    workLocation,
    isOnBreak,
    lastClockInTime,
    lastClockOutTime,
  } = useSelector((state: RootState) => state.attendance);
  const { user } = useSelector((state: RootState) => state.auth);

  // Custom Hooks
  const currentTime = useCurrentTime();
  const breakTimer = useBreakTimer(isOnBreak);
  const {
    isModalOpen,
    modalType,
    isCustomTimeOpen,
    openModal,
    closeModal,
    openCustomTime,
    closeCustomTime,
  } = useModalState();
  const {
    handleClockIn,
    handleClockOut,
    handleStartBreak,
    handleEndBreak,
    handleLocationChange,
  } = useAttendanceActions();

  // Modal Action Handlers
  const handlePrimaryAction = () => {
    switch (modalType) {
      case "clockIn":
        handleClockIn();
        break;
      case "clockOut":
        handleClockOut();
        break;
      case "break":
        handleStartBreak();
        break;
      case "cancelBreak":
        handleEndBreak();
        break;
    }
    closeModal();
  };

  const handleSaveCustomTime = (customTime: string, customDate: string) => {
    handleClockOut(customTime);
    closeCustomTime();
    closeModal();
  };

  // Clock In Card Component
  const ClockInCard = () => (
    <div className="w-full max-w-sm mx-auto shadow-none bg-none">
      <CardHeader className="bg-[#6B7FE8] text-white rounded-lg pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">Attendance</h3>
            <p className="text-sm opacity-90">{formatDate()}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-2 rounded-full">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#6B7FE8] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Work Location Toggle */}
          <div className="relative inline-flex items-center rounded-md border border-white border-opacity-30 bg-white bg-opacity-10 p-1">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 bottom-1 w-1/2 rounded-md bg-black"
              animate={{
                x: workLocation === "Remote" ? "0%" : "90%",
              }}
            />
            <button
              onClick={() => handleLocationChange("Remote")}
              className={`relative z-10 px-4 py-1 rounded-md text-sm font-medium ${
                workLocation === "Remote" ? "text-white" : "text-white/80"
              }`}
            >
              Remote
            </button>
            <button
              onClick={() => handleLocationChange("On-Site")}
              className={`relative z-10 px-4 py-1 rounded-md text-sm font-medium ${
                workLocation === "On-Site" ? "text-white" : "text-white/80"
              }`}
            >
              On-Site
            </button>
          </div>

          <div className="text-left">
            <p className="text-xs opacity-80 mb-1">Status</p>
            <Badge className="bg-white text-gray-700 hover:bg-white border-0">
              {currentAttendance?.status || "Punctual"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 bg-[#EBEFFA] mx-2 rounded-b-md">
        <div className="grid grid-cols-2 items-center gap-4 mb-4">
          {/* Live Time */}
          <div className="flex items-center gap-1">
            {currentTime.split("").map((digit, index) =>
              digit === ":" ? (
                <div
                  key={index}
                  className="flex items-center justify-center px-1"
                >
                  <span className="text-3xl font-bold text-gray-800">:</span>
                </div>
              ) : (
                <div
                  key={index}
                  className="bg-white rounded-lg w-12 h-12 flex items-center justify-center shadow-sm border border-gray-200"
                >
                  <span className="text-3xl font-bold text-gray-800">
                    {digit}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Last Activity */}
          <div>
            {formatLastClockActivity(lastClockInTime, lastClockOutTime)}
          </div>
        </div>
      </CardContent>

      {/* Buttons */}
      <div className="flex mt-5 gap-2">
        {!isClockIn ? (
          <Button
            className="w-full bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-5 rounded-lg text-base font-medium"
            onClick={() => openModal("clockIn")}
          >
            Clock In
          </Button>
        ) : (
          <>
            <Button
              className="w-[60%] bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-5 rounded-lg text-base font-medium"
              onClick={() => openModal("clockOut")}
            >
              Clock Out
            </Button>
            <Button
              className="w-[40%] bg-[#F5A623] hover:bg-[#E09612] text-white py-5 rounded-lg text-base font-medium"
              onClick={() => openModal("break")}
            >
              Take Break
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // On Break Card Component
  const OnBreakCard = () => (
    <div className="w-full max-w-sm mx-auto shadow-none bg-none">
      <CardHeader className="bg-[#FDEDCE] text-white rounded-lg pb-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-medium text-[#171717]">Break Time</h3>
            <p className="text-sm opacity-90 text-[#171717]">{formatDate()}</p>

            <div className="flex items-center gap-1">
              {`00:${String(breakTimer).padStart(2, "0")}`
                .split("")
                .map((char, index) =>
                  char === ":" ? (
                    <div
                      key={index}
                      className="flex items-center justify-center px-1"
                    >
                      <span className="text-6xl text-[#946405]">:</span>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <span className="text-6xl text-[#946405]">{char}</span>
                    </div>
                  )
                )}
            </div>
          </div>

          <Hourglass className="text-[#FCE2AF] w-24 h-24" />
        </div>
      </CardHeader>

      <div className="flex flex-col mt-5 gap-4">
        {isOnBreak && (
          <>
            <Button
              className="w-full bg-[#F5A623] hover:bg-[#E09612] text-white py-6 rounded-md text-base font-medium"
              onClick={() => openModal("cancelBreak")}
            >
              End Break
            </Button>
            <Button
              className="w-full bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-6 rounded-md text-base font-medium"
              onClick={() => openModal("clockOut")}
            >
              Clock Out
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // Get modal configuration
  const modalConfig = modalType
    ? getModalConfig(modalType, currentTime, workLocation, user?.avatar)
    : null;

  return (
    <>
      {!isOnBreak ? <ClockInCard /> : <OnBreakCard />}

      {/* Modal */}
      {modalConfig && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          header={modalConfig.header}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          imageSrc={modalConfig.imageSrc}
          imageAlt={modalConfig.imageAlt}
          primaryButtonText={modalConfig.primaryButtonText}
          onPrimaryButtonClick={handlePrimaryAction}
          secondaryButtonText={modalConfig.secondaryButtonText}
          customTimeButtonText={modalConfig.customTimeButtonText}
          onSecondaryButtonClick={closeModal}
          onCustomTimeButtonClick={openCustomTime}
          onCustomTimeButtonCloseClick={closeCustomTime}
          customModalState={isCustomTimeOpen}
          onSaveCustomTime={handleSaveCustomTime}
          clockedInTime={lastClockInTime ?? ""}
          clockedInDate={getDateString()}
        />
      )}
    </>
  );
};

export default AttendanceCard;
