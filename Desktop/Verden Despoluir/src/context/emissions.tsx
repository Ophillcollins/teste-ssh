import React, { useState, createContext, useContext } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const EmissionContext = createContext({} as any);

export const EmissionsProvider = (props: Props) => {
  const [emissions, setEmissions] = useState([]);
  const [storedCalculations, setStoredCalculations] = useState([]);
  const [month, setMonth] = useState<string>('');

  return (
    <EmissionContext.Provider
      value={{
        emissions,
        setEmissions,
        storedCalculations,
        setStoredCalculations,
        month,
        setMonth,
      }}
    >
      {props.children}
    </EmissionContext.Provider>
  );
};
export const useEmissions = () => useContext(EmissionContext);
