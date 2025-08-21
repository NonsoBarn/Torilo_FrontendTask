import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  clockIn,
  clockOut,
  setWorkLocation,
  startBreak,
  endBreak,
} from "../../store/slices/attendanceSlice";
import { CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Hourglass } from "lucide-react";
import Modal from "../common/Modal";

// Helper function to format time to 12-hour with AM/PM
const formatTimeWithAMPM = (timeStr: string | null) => {
  if (!timeStr) return "";
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// New helper function to convert 12-hour time to 24-hour format
const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(" ");
  const [h, m] = time.split(":");
  let hours = h;
  const minutes = m;

  if (modifier?.toLowerCase() === "pm" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  if (modifier?.toLowerCase() === "am" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
};

const AttendanceCard: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentAttendance,
    isClockIn,
    workLocation,
    isOnBreak,
    lastClockInTime,
    lastClockOutTime,
  } = useSelector((state: RootState) => state.attendance);
  const { user } = useSelector((state: RootState) => state.auth);

  // ---------- Modal State Management ----------
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<
    "clockIn" | "clockOut" | "break" | "cancelBreak" | "custom" | null
  >(null);
  const [isCustomTimeOpen, setIsCustomTimeOpen] = React.useState(false);

  // Live current time (remains in 24-hour format)
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Break countdown
  const [breakTimer, setBreakTimer] = React.useState(60);
  const breakIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isOnBreak) {
      setBreakTimer(60); // reset
      breakIntervalRef.current = setInterval(() => {
        setBreakTimer((prev) => {
          if (prev <= 1) {
            clearInterval(breakIntervalRef.current!);
            dispatch(
              endBreak(
                new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              )
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
    }
    return () => {
      if (breakIntervalRef.current) clearInterval(breakIntervalRef.current);
    };
  }, [isOnBreak, dispatch]);

  // ---------- New Handlers to Open Modal ----------
  const handleClockInModal = () => {
    setIsModalOpen(true);
    setModalType("clockIn");
  };

  const handleClockOutModal = () => {
    setIsModalOpen(true);
    setModalType("clockOut");
  };

  const handleBreakModal = () => {
    setIsModalOpen(true);
    setModalType("break");
  };

  const handleCancelBreakModal = () => {
    setIsModalOpen(true);
    setModalType("cancelBreak");
  };

  // ---------- Modal-specific Action Handlers ----------
  const handlePrimaryAction = () => {
    const now = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log(now);

    if (modalType === "clockIn") {
      dispatch(clockIn(now));
    } else if (modalType === "clockOut") {
      dispatch(clockOut(now));
    } else if (modalType === "break") {
      dispatch(startBreak(now));
    } else if (modalType === "cancelBreak") {
      dispatch(endBreak(now));
    }

    setIsModalOpen(false);
    setModalType(null);
  };

  const handleSecondaryAction = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleCustomTimeAction = () => {
    setIsCustomTimeOpen(true);
    setModalType("custom");
  };

  const handleCustomTimeActionClose = () => {
    setIsCustomTimeOpen(false);
    setModalType(null);
  };

  // NEW: Handler to receive custom time from Modal and dispatch the action
  const handleSaveCustomTime = (customTime: string, customDate: string) => {
    dispatch(clockOut(customTime));
    setIsCustomTimeOpen(false);
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleLocationChange = (location: "Remote" | "On-Site") => {
    dispatch(setWorkLocation(location));
  };

  const formatDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatLastClockActivity = () => {
    const date = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (
      lastClockInTime &&
      (!lastClockOutTime ||
        new Date(`2000/01/01 ${lastClockInTime}`) >
          new Date(`2000/01/01 ${lastClockOutTime}`))
    ) {
      return (
        <p className="text-xs">
          <span className="text-xs text-gray-500 mb-1">
            Last Clock-In Time & Date:
          </span>
          <br />
          {formatTimeWithAMPM(lastClockInTime)} ({date})
        </p>
      );
    }

    if (lastClockOutTime) {
      return (
        <p className="text-xs">
          <span className="text-xs text-gray-500 mb-1">
            Last Clock-Out Time & Date:
          </span>
          <br />
          {formatTimeWithAMPM(lastClockOutTime)} ({date})
        </p>
      );
    }

    return null; // Return null if neither time is available
  };

  // ---------- Clock In Card ----------
  const clockInCard = () => (
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
                x: workLocation === "Remote" ? "0%" : "100%",
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
            <Badge className="bg-white text-gray-700 hover:bg-white border-0 ">
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
          <div className="">{formatLastClockActivity()}</div>
        </div>
      </CardContent>

      {/* Buttons */}
      <div className="flex mt-5 gap-2">
        {!isClockIn ? (
          <Button
            className="w-full bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-5 rounded-lg text-base font-medium"
            onClick={handleClockInModal}
          >
            Clock In
          </Button>
        ) : (
          <>
            <Button
              className="w-[60%] bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-5 rounded-lg text-base font-medium"
              onClick={handleClockOutModal}
            >
              Clock Out
            </Button>
            <Button
              className="w-[40%] bg-[#F5A623] hover:bg-[#E09612] text-white py-5 rounded-lg text-base font-medium"
              onClick={handleBreakModal}
            >
              Take Break
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // ---------- On Break Card ----------
  const onBreakCard = () => (
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
              onClick={handleCancelBreakModal}
            >
              End Break
            </Button>
            <Button
              className="w-full bg-[#6B7FE8] hover:bg-[#5A6FD7] text-white py-6 rounded-md text-base font-medium"
              onClick={handleClockOutModal}
            >
              Clock Out
            </Button>
          </>
        )}
      </div>
    </div>
  );

  // ---------- Modal Configuration based on state ----------
  const modalConfig = React.useMemo(() => {
    const time = formatTimeWithAMPM(currentTime);
    const date = formatDate();
    const locationInfo = `${workLocation}: ${date}`;

    switch (modalType) {
      case "clockIn":
        return {
          header: "Confirm Clock In",
          title: `Clock In at ${time} `,
          subtitle: `${locationInfo}\n${time}`,
          imageSrc: user?.avatar,
          imageAlt: "Clock-In Image",
          primaryButtonText: "Yes, Clock In",
          secondaryButtonText: "No, Cancel",
        };
      case "clockOut":
        return {
          header: "Confirm Clock Out",
          title: `Clock Out at ${time} `,
          subtitle: `${locationInfo}\n${time}`,
          imageSrc: user?.avatar,
          imageAlt: "Clock-Out Image",
          primaryButtonText: "Yes, Clock Out",
          secondaryButtonText: "No, Cancel",
          customTimeButtonText: "Enter a Custom Time",
        };
      case "break":
        return {
          header: "Confirm Break Start",
          title: `Take a Break at ${time}`,
          subtitle: `${locationInfo}\n${time}`,
          imageSrc: user?.avatar,
          imageAlt: "Break Image",
          primaryButtonText: "Yes, Take a Break",
          secondaryButtonText: "No, Continue Working",
        };
      case "cancelBreak":
        return {
          header: "Confirm Break End",
          title: `End Break at ${time}`,
          subtitle: `${locationInfo}\n${time}`,
          imageSrc: user?.avatar,
          imageAlt: "Break Image",
          primaryButtonText: "Yes, End Break",
          secondaryButtonText: "No, Continue Break",
        };
      case "custom":
        return {
          header: "Select Clock-Out Time",
          title: `Take a Break at ${time}`,
          subtitle: `${locationInfo}\n${time}`,
          imageSrc: user?.avatar,
          imageAlt: "Break Image",
          primaryButtonText: "Save & Clock out",
          secondaryButtonText: "Cancel",
        };
      default:
        return null;
    }
  }, [modalType, currentTime, workLocation, user]);

  return (
    <>
      {!isOnBreak ? clockInCard() : onBreakCard()}

      {/* ---------- Render the Modal Conditionally ---------- */}
      {modalConfig && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleSecondaryAction}
          header={modalConfig.header}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          imageSrc={modalConfig.imageSrc}
          imageAlt={modalConfig.imageAlt}
          primaryButtonText={modalConfig.primaryButtonText}
          onPrimaryButtonClick={handlePrimaryAction}
          secondaryButtonText={modalConfig.secondaryButtonText}
          customTimeButtonText={modalConfig.customTimeButtonText}
          onSecondaryButtonClick={handleSecondaryAction}
          onCustomTimeButtonClick={handleCustomTimeAction}
          onCustomTimeButtonCloseClick={handleCustomTimeActionClose}
          customModalState={isCustomTimeOpen}
          onSaveCustomTime={handleSaveCustomTime}
        />
      )}
    </>
  );
};

export default AttendanceCard;
