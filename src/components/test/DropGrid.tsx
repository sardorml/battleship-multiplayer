import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";

interface Square {
  id: string;
  position: number; // Index in the grid
}

const DropGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const hovered = useRef<number>();
  const [droppedSquares, setDroppedSquares] = useState<number[]>([]);
  const [squares, setSquares] = useState<Square[]>([]); // Track dropped squares
  const gridRef = useRef<HTMLDivElement | null>(null); // Reference for the grid

  const [, drop] = useDrop(() => ({
    accept: "SQUARE",
    hover: (item: { id: string; size: number }, monitor) => {
      if (!gridRef.current) return;
      console.log("hovered");

      const gridRect = gridRef.current.getBoundingClientRect();
      const dropPosition = monitor.getClientOffset();

      if (dropPosition) {
        const relativeX = dropPosition.x - gridRect.left;
        const relativeY = dropPosition.y - gridRect.top;

        const cellSize = 20; // Size of each cell in pixels (1.25rem = 20px)
        const column = Math.floor(relativeX / cellSize);
        const row = Math.floor(relativeY / cellSize);

        // Ensure the calculated column and row are within the grid bounds
        if (column >= 0 && column < 10 && row >= 0 && row < 10) {
          const index = row * 10 + column;
          hovered.current = index;
          setHoveredCell(index);
          console.log("hovered");
        }
      }
    },
    drop: (item: { id: string; size: number }) => {
      console.log(hovered.current);
      if (hovered.current) {
        setDroppedSquares((prev) => [...prev, hovered.current!]);
      }
    },
  }));

  return (
    <div
      ref={(node) => {
        drop(node);
        gridRef.current = node;
      }}
      className="relative flex w-[200px] flex-wrap"
    >
      {Array.from({ length: 100 }).map((_, index) => {
        return (
          <span
            key={index}
            className={clsx("w-5 h-5 block", {
              "bg-stone-500": hovered.current === index,
              "bg-stone-600": droppedSquares.includes(index), // Change color for dropped squares
              "bg-stone-300": hovered.current !== index,
            })}
          >
            {index}
          </span>
        );
      })}
    </div>
  );
};

export default DropGrid;
