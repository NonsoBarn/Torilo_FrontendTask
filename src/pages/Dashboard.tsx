import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Navbar from "../components/layout/Navbar";
import AttendanceCard from "../components/dashboard/AttendanceCard";
import TaskFeed from "../components/dashboard/TaskFeed";
import TimeoffSection from "../components/dashboard/TimeoffSection";
import BenefitsSection from "../components/dashboard/BenefitsSection";
import CelebrationsPanel from "../components/dashboard/CelebrationsPanel";
import TimeoffRecord from "../components/dashboard/TimeoffRecord";
import MyTeams from "../components/dashboard/MyTeams";
import AttendanceSnapshot from "@/components/dashboard/AttendanceSnapshot";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-24 py-6">
        <div className="mb-6">
          <p className="text-gray-600 text-sm">Good Morning,</p>
          <h1 className="text-2xl font-semibold text-gray-900">{user?.name}</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="xl:col-span-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Card */}
              <div className="lg:col-span-1">
                <AttendanceCard />
              </div>

              {/* Task Feed */}
              <div className="lg:col-span-1">
                <TaskFeed />
              </div>
            </div>

            {/* Attendance snapshot */}
            <AttendanceSnapshot />

            {/* Time Off */}
            <TimeoffSection />

            {/* Benefit Section */}
            <BenefitsSection />
          </div>

          {/* Right Column */}
          <div className="xl:col-span-4 space-y-6">
            <CelebrationsPanel />
            <TimeoffRecord />
            <MyTeams />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
