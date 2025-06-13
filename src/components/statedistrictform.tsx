// components/StateDistrictForm.tsx
"use client";

import { useState } from "react";
import { StateSelector } from "./statesselector";
import { DistrictSelector } from "./districtselector";

export const StateDistrictForm = () => {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);

  const stateDistrictMap: Record<string, string[]> = {
    WB: ["Kolkata", "Howrah", "Darjeeling", "Burdwan"],
    MH: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    DL: ["Central Delhi", "South Delhi", "North Delhi"],
    KA: ["Bangalore Urban", "Mysuru", "Mangalore"],
    TN: ["Chennai", "Coimbatore", "Madurai"],
    RJ: ["Jaipur", "Jodhpur", "Udaipur"],
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setDistricts(stateDistrictMap[state] || []);
  };

  return (
    <div className="space-y-4">
      <StateSelector onChange={handleStateChange} />
      <DistrictSelector districts={districts} />
    </div>
  );
};
