import { formatTimeWithAMPM, formatDate } from "./timeUtils";

type ModalType = "clockIn" | "clockOut" | "break" | "cancelBreak" | "custom";

export const getModalConfig = (
  modalType: ModalType,
  currentTime: string,
  workLocation: string,
  userAvatar?: string
) => {
  const time = formatTimeWithAMPM(currentTime);
  const date = formatDate();
  const locationInfo = `${workLocation}: ${date}`;

  const configs = {
    clockIn: {
      header: "Confirm Clock In",
      title: `Clock In at ${time}`,
      subtitle: `${locationInfo}\n${time}`,
      imageSrc: userAvatar,
      imageAlt: "Clock-In Image",
      primaryButtonText: "Yes, Clock In",
      secondaryButtonText: "No, Cancel",
      customTimeButtonText: "",
    },
    clockOut: {
      header: "Confirm Clock Out",
      title: `Clock Out at ${time}`,
      subtitle: `${locationInfo}\n${time}`,
      imageSrc: userAvatar,
      imageAlt: "Clock-Out Image",
      primaryButtonText: "Yes, Clock Out",
      secondaryButtonText: "No, Cancel",
      customTimeButtonText: "Enter a Custom Time",
    },
    break: {
      header: "Confirm Break Start",
      title: `Take a Break at ${time}`,
      subtitle: `${locationInfo}\n${time}`,
      imageSrc: userAvatar,
      imageAlt: "Break Image",
      primaryButtonText: "Yes, Take a Break",
      secondaryButtonText: "No, Continue Working",
      customTimeButtonText: "",
    },
    cancelBreak: {
      header: "Confirm Break End",
      title: `End Break at ${time}`,
      subtitle: `${locationInfo}\n${time}`,
      imageSrc: userAvatar,
      imageAlt: "Break Image",
      primaryButtonText: "Yes, End Break",
      secondaryButtonText: "No, Continue Break",
      customTimeButtonText: undefined,
    },
    custom: {
      header: "Select Clock-Out Time",
      title: `Take a Break at ${time}`,
      subtitle: `${locationInfo}\n${time}`,
      imageSrc: userAvatar,
      imageAlt: "Break Image",
      primaryButtonText: "Save & Clock out",
      secondaryButtonText: "Cancel",
      customTimeButtonText: undefined,
    },
  };

  return configs[modalType];
};
