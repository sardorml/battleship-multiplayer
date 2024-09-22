// DraggableSquare.tsx
import React from "react";
import { useDrag } from "react-dnd";

interface DraggableSquareProps {
  size?: number; // Size in pixels
}

const DraggableSquare: React.FC<DraggableSquareProps> = ({ size = 20 }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "SQUARE",
    item: { id: "unique-square-id", size }, // Add an id or other properties here
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-stone-500"
      style={{
        width: 20,
        height: size,
      }}
    />
  );
};

export default DraggableSquare;
