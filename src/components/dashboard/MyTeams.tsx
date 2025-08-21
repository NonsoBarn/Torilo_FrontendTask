import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const MyTeams: React.FC = () => {
  const teamMembers = [
    {
      id: "1",
      name: "John Micheal",
      position: "Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "John Micheal",
      position: "Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "John Micheal",
      position: "Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "John Micheal",
      position: "Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "John Micheal",
      position: "Founder",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <Card className="px-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          My Teams
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Scrollable container */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between shadow-sm rounded-md p-2 bg-[#FAFAFA]"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    JM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.position}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-[#545454] bg-[#D6F2F5]"
              >
                Contact
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTeams;
