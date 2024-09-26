import React, { createContext, useContext, useState } from "react";
import surgeriesData from "../data/surgeries.json"; // Corrected path

const SurgeryContext = createContext();

export const useSurgery = () => useContext(SurgeryContext);

export const SurgeryProvider = ({ children }) => {
  // Including OR data in state
  const initialOrData = [
    {
      id: "OR 1",
      surgeonName: "Dr. Smith",
      raName: "Dr. Johnson",
      surgeryType: "Open Appendectomy",
    },
    {
      id: "OR 2",
      surgeonName: "Dr. Jones",
      raName: "Dr. Williams",
      surgeryType: "Single Lung Transplant",
    },
    {
      id: "OR 3",
      surgeonName: "Dr. Vogel",
      raName: "Dr. Neils",
      surgeryType: "Spinal Fusion: Anterior Lumbar Interbody Fusion (ALIF)",
    },
    {
      id: "OR 4",
      surgeonName: "Dr. Lee",
      raName: "Dr. Kim",
      surgeryType: "Cesarean Section",
    },
    {
      id: "OR 5",
      surgeonName: "Dr. Gomez",
      raName: "Dr. Santos",
      surgeryType: "Herniorrhaphy (Repair)",
    },
    {
      id: "OR 6",
      surgeonName: "Dr. Patel",
      raName: "Dr. Murray",
      surgeryType: "Herniorrhaphy (Removal)",
    },
  ].map((or) => ({
    ...or,
    surgeryStage: surgeriesData.find(
      (surgery) => surgery.surgeryType === or.surgeryType,
    )?.steps[0], // Set to first step
  }));

  const [orData, setOrData] = useState(initialOrData);

  // Function to get surgery steps by type
  const getSurgerySteps = (surgeryType) => {
    const surgery = surgeriesData.find(
      (surgery) => surgery.surgeryType === surgeryType,
    );
    return surgery ? surgery.steps : [];
  };

  // Function to update the current stage of a surgery in OR data
  const updateSurgeryStage = (orId, newStage) => {
    setOrData((prev) =>
      prev.map((or) =>
        or.id === orId ? { ...or, surgeryStage: newStage } : or,
      ),
    );
  };

  return (
    <SurgeryContext.Provider
      value={{ orData, updateSurgeryStage, getSurgerySteps }}
    >
      {children}
    </SurgeryContext.Provider>
  );
};
