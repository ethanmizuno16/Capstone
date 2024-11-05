import React, { createContext, useContext, useState } from "react";
import obstetricsData from "../data/obstetricsData.json";

const ObstetricsContext = createContext();

export const useObstetrics = () => useContext(ObstetricsContext);

export const ObstetricsProvider = ({ children }) => {
  const [obCases, setObCases] = useState(
    obstetricsData.map((caseItem) => ({
      ...caseItem,
      currentStep: caseItem.steps[0], // Start with the first step
    }))
  );

  const getSteps = (caseId) => {
    const obCase = obCases.find((c) => c.id === caseId);
    return obCase ? obCase.steps : [];
  };

  const updateCaseStep = (caseId) => {
    setObCases((prevCases) =>
      prevCases.map((obCase) => {
        if (obCase.id === caseId) {
          const nextStepIndex = obCase.steps.indexOf(obCase.currentStep) + 1;
          const newStep = obCase.steps[nextStepIndex] || obCase.currentStep;
          return { ...obCase, currentStep: newStep };
        }
        return obCase;
      })
    );
  };

  const getCompletionPercentage = (caseId) => {
    const obCase = obCases.find((c) => c.id === caseId);
    if (obCase) {
      const totalSteps = obCase.steps.length;
      const currentStepIndex = obCase.steps.indexOf(obCase.currentStep) + 1;
      const percentage = (currentStepIndex / totalSteps) * 100;
      return `${percentage.toFixed(0)}% Complete (Stage ${currentStepIndex}/${totalSteps})`;
    }
    return "0% Complete";
  };

  return (
    <ObstetricsContext.Provider
      value={{ obCases, getSteps, updateCaseStep, getCompletionPercentage }}
    >
      {children}
    </ObstetricsContext.Provider>
  );
};
