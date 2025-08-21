import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { benefits } from "@/data";

const BenefitsSection: React.FC = () => {
  return (
    <Card className="rounded-2xl border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.id}
                className="border border-gray-200 rounded-2xl"
              >
                <CardContent className="p-5">
                  {/* Icon + Details */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-16 h-16 flex items-center justify-center rounded-lg ${benefit.colorBg}`}
                    >
                      <Icon className={`w-6 h-6 ${benefit.colorIcon}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {benefit.name}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {benefit.provider}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {benefit.dependents} Dependent
                        {benefit.dependents !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Visit Website bar */}
                  <div
                    className={`w-full flex justify-center items-center gap-2 px-3 py-2 rounded-md bg-[#FAFAFA] mb-4`}
                  >
                    <Globe className={`w-4 h-4 ${benefit.linkColor}`} />
                    <span
                      className={`text-xs font-medium ${benefit.linkColor}`}
                    >
                      Visit Website
                    </span>
                  </div>

                  {/* View Button */}
                  <Button
                    variant="outline"
                    className="w-full py-3 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 rounded-lg"
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsSection;
