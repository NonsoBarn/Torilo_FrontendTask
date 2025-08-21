import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttendanceData {
  daysPresent: number;
  unauthorizedAbsent: number;
  totalPerformance: number;
}

interface AttendanceSnapshotProps {
  punctualityData?: AttendanceData;
  attendanceData?: AttendanceData;
  month?: string;
}

const AttendanceSnapshot: React.FC<AttendanceSnapshotProps> = ({
  punctualityData = {
    daysPresent: 80,
    unauthorizedAbsent: 10,
    totalPerformance: 91,
  },
  attendanceData = {
    daysPresent: 80,
    unauthorizedAbsent: 10,
    totalPerformance: 91,
  },
  month = "January",
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-0">
      {/* Header */}
      <div className="my-3">
        <h2 className="text-lg font-semibold text-gray-600 ">
          Your Attendance Snapshot - {month}
        </h2>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Punctuality Performance Card */}
        <Card className=" border-blue-200 bg-[#E5F9FF]">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium text-gray-700 flex items-center justify-between border-b-2 border-blue-200 pb-2">
              Punctuality Performance
              <span className="text-xl font-bold">
                {punctualityData.totalPerformance}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#CCF3FF] rounded-lg p-2 text-start backdrop-blur-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Days Present
                </div>
                <div className="text-md">{punctualityData.daysPresent}%</div>
              </div>
              <div className="bg-[#CCF3FF] rounded-lg p-4 text-start backdrop-blur-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Unauthorized Absent
                </div>
                <div className="text-md">
                  {punctualityData.unauthorizedAbsent}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Performance Card */}

        <Card className="bg-[#FEF6E6] border-orange-200 ">
          <CardHeader className="pb-0">
            <CardTitle className="text-md font-medium text-gray-700 flex items-center justify-between border-b-2 border-orange-200 pb-2">
              Attendance Performance
              <span className="text-xl font-bold">
                {attendanceData.totalPerformance}%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#FDEDCE] rounded-lg p-2 text-start backdrop-blur-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Days Present
                </div>
                <div className="text-md">{attendanceData.daysPresent}%</div>
              </div>
              <div className="bg-[#FDEDCE] rounded-lg p-4 text-start backdrop-blur-sm">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Unauthorized Absent
                </div>
                <div className="text-md">
                  {attendanceData.unauthorizedAbsent}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceSnapshot;
