import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import DroppedSquare from "./DroppedSquare"; // Import the new component

const DropGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<number[][]>([]);
  const hovered = useRef<number[][]>();
  const [droppedSquares, setDroppedSquares] = useState<
    { id: string; position: [number, number]; size: number }[]
  >([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop(() => ({
    accept: "SQUARE",
    hover: handleHover,
    drop: handleDrop,
  }));

  function handleDrop(item: { id: string; size: number }) {
    console.log(hovered);
    if (!hovered.current) return;

    // Get the first hovered cell's position
    const position = hovered.current[0] as [number, number];

    setDroppedSquares((prev) => {
      // Check if a square with the same id already exists
      console.log("dropped squares", prev);
      const squareIndex = prev.findIndex((square) => square.size === item.size);

      if (squareIndex !== -1) {
        // If found, update its position
        const updatedSquares = [...prev];
        updatedSquares[squareIndex] = {
          ...updatedSquares[squareIndex],
          position,
        };
        return updatedSquares;
      } else {
        // If not found, add a new square
        return [
          ...prev,
          {
            id: item.id + item.size,
            position,
            size: item.size,
          },
        ];
      }
    });
    setHoveredCell([]); // Clear hovered cells after drop
  }

  function handleHover(item: { id: string; size: number }, monitor: any) {
    if (!gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const dropPosition = monitor.getClientOffset();

    if (dropPosition) {
      const relativeX = dropPosition.x - gridRect.left;
      const relativeY = dropPosition.y - gridRect.top;

      const cellSize = 20; // Each cell is 20px
      const column = Math.floor(relativeX / cellSize);
      const row = Math.floor(relativeY / cellSize);

      const numberOfRows = Math.ceil(item.size / cellSize);
      const adjustedRow = Math.min(row, 10 - numberOfRows); // Prevent overflow

      if (column >= 0 && column < 10 && adjustedRow >= 0 && adjustedRow < 10) {
        const hoveredCells = [];
        for (let i = 0; i < numberOfRows; i++) {
          if (adjustedRow + i < 10) {
            hoveredCells.push([adjustedRow + i, column]);
          }
        }
        hovered.current = hoveredCells;
        setHoveredCell(hoveredCells);
      }
    }
  }

  return (
    <div
      ref={(node) => {
        drop(node);
        gridRef.current = node;
      }}
      className="relative flex w-[200px] h-[200px] flex-wrap"
    >
      {/* Render the grid */}
      {Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 10 }, (_, columnIndex) => (
          <button
            key={`${rowIndex}-${columnIndex}`}
            className={clsx("w-5 h-5 block border border-stone-400", {
              "bg-stone-500": hoveredCell?.some(
                ([r, c]) => r === rowIndex && c === columnIndex
              ),
              "bg-stone-300": !hoveredCell?.some(
                ([r, c]) => r === rowIndex && c === columnIndex
              ),
            })}
          />
        ))
      )}

      {/* Render the dropped squares */}
      {droppedSquares.map((square) => (
        <DroppedSquare
          key={square.id}
          position={square.position}
          size={square.size}
          id={square.id}
        />
      ))}
    </div>
  );
};

export default DropGrid;
