import React from "react";
import { useDrag } from "react-dnd";

const DroppedSquare: React.FC<{
  position: [number, number];
  size: number;
  id: string;
}> = ({ position, size, id }) => {
  const cellSize = 20; // Each cell is 20px
  const [row, column] = position;

  // Use react-dnd's useDrag hook
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SQUARE", // Drag the same type of square
    item: { id, size, position }, // Item being dragged
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        top: row * cellSize,
        left: column * cellSize,
        width: "20px", // Adjust this based on the size or the desired appearance
        height: `${size}px`, // Size from the dropped item
        backgroundColor: isDragging
          ? "rgba(100, 100, 250, 0.3)" // Change the opacity when dragging
          : "rgba(100, 100, 250, 0.5)", // Example color when not dragging
        cursor: "move", // Show a move cursor to indicate it's draggable
      }}
    />
  );
};

export default DroppedSquare;
