"use client";
import React, { ReactNode } from "react";
import { useDrag, useDrop } from "react-dnd";
import "react-resizable/css/styles.css";

interface DraggableResizableWrapperProps {
  id: string;
  initialX: number;
  initialY: number;
  onDragEnd?: (id: string, x: number, y: number) => void;
  children: ReactNode;
}

const DraggableResizableWrapper: React.FC<DraggableResizableWrapperProps> = ({
  id,
  initialX,
  initialY,
  onDragEnd,
  children,
}) => {
  const [position, setPosition] = React.useState({ x: initialX, y: initialY });

  const [{ isDragging }, dragRef] = useDrag({
    type: "component",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      if (monitor.didDrop() && onDragEnd) {
        onDragEnd(id, position.x, position.y);
      }
    },
  });

  const [, dropRef] = useDrop({
    accept: "component",
    hover: (_, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        setPosition((prev) => ({
          x: prev.x + delta.x,
          y: prev.y + delta.y,
        }));
      }
    },
  });

  return (
    <div
      //@ts-ignore
      ref={(node) => dragRef(dropRef(node))}
      style={{
        // position: "absolute",
        top: position.y,
        left: position.x,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

export default DraggableResizableWrapper;
