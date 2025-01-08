"use client";

import { createContext, useContext, useState } from "react";

interface LoadingOverlayContextProps {
  overlay: boolean;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingOverlayContext = createContext<
  LoadingOverlayContextProps | undefined
>(undefined);

export const LoadingOverlayProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [overlay, setOverlay] = useState(false);

  return (
    <LoadingOverlayContext.Provider value={{ overlay, setOverlay }}>
      {children}
    </LoadingOverlayContext.Provider>
  );
};

export const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlayContext);
  if (!context) {
    throw new Error(
      "useLoadingOverlay must be used within a LoadingOverlayProvider"
    );
  }
  return context;
};
