import React from "react";
import { useDrag } from "react-dnd";

const DroppedSquare: React.FC<{
  position: number[][]; // Updated to accept multiple positions
  size: number;
  id: string;
  onClick: () => void;
}> = ({ position, size, id, onClick }) => {
  console.log("position.dropped", position);
  const cellSize = 20; // Each cell is 20px

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
      onClick={onClick}
      style={{
        position: "absolute",
        backgroundColor: isDragging
          ? "rgba(100, 100, 250, 0.3)" // Change the opacity when dragging
          : "rgba(100, 100, 250, 0.5)", // Example color when not dragging
        cursor: "move", // Show a move cursor to indicate it's draggable
      }}
    >
      {position.map(([row, column]) => (
        <div
          key={`${row}-${column}`}
          style={{
            position: "absolute",
            top: row * cellSize,
            left: column * cellSize,
            width: `${cellSize}px`, // Adjust width based on cell size
            height: `${cellSize}px`, // Adjust height based on cell size
            backgroundColor: "inherit", // Inherit background color
          }}
        />
      ))}
    </div>
  );
};

export default DroppedSquare;
