"use client";
import { isTouchDevice } from "@/utils/is-touch-device";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export const DraggableResizableProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  console.log(isTouchDevice());
  return (
    <DndProvider
      backend={isTouchDevice() ? TouchBackend : HTML5Backend}
      options={{
        enableMouseEvents: true,
        enableTouchEvents: true,
      }}
    >
      {children}
    </DndProvider>
  );
};
