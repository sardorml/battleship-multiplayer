// DroppedSquare.tsx
import React from "react";

type DroppedSquareProps = {
  position: [number, number]; // [row, column]
  size: number; // Height of the square
  id: string; // Unique identifier
};

const DroppedSquare: React.FC<DroppedSquareProps> = ({
  position,
  size,
  id,
}) => {
  const [row, column] = position;

  return (
    <div
      style={{
        position: "absolute",
        top: `${row * 20}px`, // Each cell is 20px
        left: `${column * 20}px`,
        width: "20px",
        height: `${size}px`,
        backgroundColor: "blue", // You can customize the color
        zIndex: 10,
      }}
      id={id}
    ></div>
  );
};

export default DroppedSquare;
