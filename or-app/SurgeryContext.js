import React, { createContext, useContext, useState } from 'react';
import surgeriesData from './surgeries.json'; // Ensure the import of surgery steps

const SurgeryContext = createContext();

export const useSurgery = () => useContext(SurgeryContext);

export const SurgeryProvider = ({ children }) => {
  // Including OR data in state
  const [orData, setOrData] = useState([
    { id: 'OR 1', surgeonName: 'Dr. Smith', raName: 'Dr. Johnson', surgeryType: 'Open Appendectomy', surgeryStage: 'Intubation' },
    { id: 'OR 2', surgeonName: 'Dr. Jones', raName: 'Dr. Williams', surgeryType: 'Single Lung Transplant', surgeryStage: 'Lung Exposure' },
    { id: 'OR 3', surgeonName: 'Dr. Vogel', raName: 'Dr. Neils', surgeryType: 'Spinal Fusion: Anterior Lumbar Interbody Fusion (ALIF)', surgeryStage: 'Spine exposure' },
    { id: 'OR 4', surgeonName: 'Dr. Lee', raName: 'Dr. Kim', surgeryType: 'Cesarean Section', surgeryStage: 'Suctioning of Amniotic Fluids' },
    { id: 'OR 5', surgeonName: 'Dr. Gomez', raName: 'Dr. Santos', surgeryType: 'Herniorrhaphy (Repair)', surgeryStage: 'Hernia isolation' },
    { id: 'OR 6', surgeonName: 'Dr. Patel', raName: 'Dr. Murray', surgeryType: 'Herniorrhaphy (Removal)', surgeryStage: 'Initial incision' },
  ]);

  // Function to get surgery steps by type
  const getSurgerySteps = (surgeryType) => {
    const surgery = surgeriesData.find(surgery => surgery.surgeryType === surgeryType);
    return surgery ? surgery.steps : [];
  };

  // Function to update the current stage of a surgery in OR data
  const updateSurgeryStage = (orId, newStage) => {
    setOrData(prev => prev.map(or => 
      or.id === orId ? { ...or, surgeryStage: newStage } : or
    ));
  };

  return (
    <SurgeryContext.Provider value={{ orData, updateSurgeryStage, getSurgerySteps }}>
      {children}
    </SurgeryContext.Provider>
  );
};