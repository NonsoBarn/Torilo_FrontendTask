import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  header: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryButtonText: string;
  onPrimaryButtonClick: () => void;
  secondaryButtonText?: string;
  customTimeButtonText?: string;
  onSecondaryButtonClick?: () => void;
  onCustomTimeButtonClick?: () => void;
  onCustomTimeButtonCloseClick?: () => void;
  customModalState?: boolean;
  clockedInTime?: string;
  clockedInDate?: string;
  onSaveCustomTime: (time: string, date: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  header,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  primaryButtonText,
  onPrimaryButtonClick,
  secondaryButtonText,
  customTimeButtonText,
  onSecondaryButtonClick,
  onCustomTimeButtonClick,
  onCustomTimeButtonCloseClick,
  customModalState,
  clockedInTime = "9:30",
  clockedInDate = "17 Jul, 2023",
  onSaveCustomTime,
}) => {
  // Initialize state with a default value to avoid uncontrolled component warnings
  const [clockOutTime, setClockOutTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
  const [clockOutDate, setClockOutDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full h-[60%]">
        {customModalState === false ? (
          <div className="flex flex-col items-center justify-center text-center px-4">
            <DialogTitle className="text-md font-semibold text-gray-500 mb-4">
              {header}
            </DialogTitle>
            <DialogHeader>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="mb-4 h-20 w-20 rounded-full object-cover"
                />
              )}
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              {subtitle && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
            <DialogFooter className="mt-6 flex w-full flex-col gap-y-4 sm:flex-col sm:space-x-0">
              <Button
                onClick={onPrimaryButtonClick}
                className="w-full bg-[#2898A4] text-white py-5"
              >
                {primaryButtonText}
              </Button>
              {secondaryButtonText && (
                <Button
                  onClick={onSecondaryButtonClick}
                  className="w-full py-5 bg-[#D6F2F5] text-[#2898A4]"
                >
                  {secondaryButtonText}
                </Button>
              )}
              {customTimeButtonText && (
                <Button
                  onClick={onCustomTimeButtonClick}
                  className="w-full py-5 bg-transparent border-none shadow-none text-[#2898A4] hover:bg-transparent hover:text-[#2898a4e5]"
                >
                  {customTimeButtonText}
                </Button>
              )}
            </DialogFooter>
          </div>
        ) : (
          <div className="flex flex-col px-0 py-4">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-lg font-semibold text-gray-900 mb-2">
                Select Clock-Out Time
              </DialogTitle>
              <div className="text-sm text-gray-500">
                Clocked in at {clockedInTime} • Onsite • {clockedInDate}
              </div>
            </DialogHeader>
            <div className="space-y-5 mb-6">
              {/* Time Input with native time picker */}
              <div className="relative">
                <input
                  type="time"
                  value={clockOutTime}
                  onChange={(e) => setClockOutTime(e.target.value)}
                  className="w-full px-3 py-6 text-start bg-gray-50 border-gray-200 rounded-lg text-gray-700"
                  placeholder="5:30 PM"
                />
              </div>
              {/* Date Input with native date picker */}
              <div className="relative">
                <input
                  type="date"
                  value={clockOutDate}
                  onChange={(e) => setClockOutDate(e.target.value)}
                  className="w-full px-4 py-6 text-start bg-gray-50 border-gray-200 rounded-lg text-gray-700"
                  placeholder="18 Jul, 2023"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full bg-[#2898A4] hover:bg-[#2898A4]/90 text-white py-5 rounded-lg font-medium"
                onClick={() => onSaveCustomTime(clockOutTime, clockOutDate)}
              >
                Save & Clock out
              </Button>
              <Button
                variant="outline"
                className="w-full bg-[#D6F2F5] hover:bg-[#D6F2F5]/80 hover:text-white text-[#2898A4] border-transparent py-5 rounded-lg font-medium"
                onClick={onCustomTimeButtonCloseClick}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
