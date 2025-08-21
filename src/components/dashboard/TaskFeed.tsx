import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { tasks } from "@/data";

const TaskFeed: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-2xl">
          Tasks
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ maxHeight: "20rem" }}
        >
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-1 px-2 rounded-lg bg-[#FAFAFA] shadow-sm"
                style={{ minHeight: "3.5rem" }}
              >
                <div className="flex-1">
                  <p className="text-xs">
                    <span className="text-gray-600">{task.description}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {task.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#4069D0] font-light"
                    >
                      {task.action}
                    </Button>
                  )}
                  {task.comment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#4069D0] font-light"
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFeed;
