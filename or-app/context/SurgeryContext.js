import React, { createContext, useContext, useState } from "react";
import surgeriesData from "../data/surgeries.json"; // Corrected path

const SurgeryContext = createContext();

export const useSurgery = () => useContext(SurgeryContext);

export const SurgeryProvider = ({ children }) => {
  // Including OR data in state with shifts and possible replacements
  const initialOrData = [
    {
      id: "OR 1",
      surgeonName: "Dr. Smith",
      raName: "Dr. Johnson", // Primary anesthesiologist
      shift: "Call Shift #2",
      replacement: {
        name: "LeBron James", // Replacement anesthesiologist
        shift: "Call Shift #1",
        time: "3:00 PM", // Time of replacement
      },
      surgeryType: "Open Appendectomy",
    },
    {
      id: "OR 2",
      surgeonName: "Dr. Jones",
      raName: "Dr. Williams",
      shift: "Call Shift #3", // No replacement, finishing the case
      replacement: null,
      surgeryType: "Single Lung Transplant",
    },
    {
      id: "OR 3",
      surgeonName: "Dr. Vogel",
      raName: "Dr. Neils",
      shift: "Call Shift #5",
      replacement: null, // Finishing the case
      surgeryType: "Spinal Fusion: Anterior Lumbar Interbody Fusion (ALIF)",
    },
    {
      id: "OR 4",
      surgeonName: "Dr. Lee",
      raName: "Dr. Kim",
      shift: "Call Shift #1",
      replacement: {
        name: "Dr. Patel",
        shift: "Call Shift #4",
        time: "4:30 PM", // Time of replacement
      },
      surgeryType: "Cesarean Section",
    },
    {
      id: "OR 5",
      surgeonName: "Dr. Gomez",
      raName: "Dr. Santos",
      shift: "Call Shift #2",
      replacement: null,
      surgeryType: "Herniorrhaphy (Repair)",
    },
    {
      id: "OR 6",
      surgeonName: "Dr. Patel",
      raName: "Dr. Murray",
      shift: "Call Shift #3",
      replacement: {
        name: "Dr. James",
        shift: "Call Shift #1",
        time: "12:00 PM",
      },
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
