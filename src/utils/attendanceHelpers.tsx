import { formatTimeWithAMPM, getDateString } from "./timeUtils";

export const formatLastClockActivity = (
  lastClockInTime: string | null,
  lastClockOutTime: string | null
) => {
  const date = getDateString();

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

  return null;
};
