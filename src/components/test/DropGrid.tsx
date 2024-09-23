import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import DroppedSquare from "./DroppedSquare"; // Import the new component

const DropGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<number[][]>([]);
  const hovered = useRef<number[][]>();
  const [droppedSquares, setDroppedSquares] = useState<
    { id: string; position: number[][]; size: number }[]
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
    const position = hovered.current;

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
        console.log("postion", hovered.current);
        setHoveredCell(hoveredCells);
      }
    }
  }

  const handleBoxClick = (id: string, size: number) => {
    setDroppedSquares((prev) => {
      const squareIndex = prev.findIndex((square) => square.id === id);
      if (squareIndex !== -1) {
        const currentSquare = prev[squareIndex];
        const currentPositions = currentSquare.position;

        // Determine if the square is currently vertical or horizontal
        const isVertical =
          currentPositions.length > 1 &&
          currentPositions.every(
            (pos, index) => pos[1] === currentPositions[0][1] // Check if all columns are the same
          );

        const newPositions: number[][] = [];
        const sizeInCells = size / 20; // Assuming size is in pixels and each cell is 20px
        const gridSize = 10; // Assuming a 10x10 grid

        if (isVertical) {
          // Rotate to horizontal
          const [row, col] = currentPositions[0];
          for (let i = 0; i < sizeInCells; i++) {
            newPositions.push([row, col + i]);
          }

          // Check for overflow and adjust if necessary
          const overflow = newPositions.some((pos) => pos[1] >= gridSize);
          if (overflow) {
            const offset =
              newPositions[newPositions.length - 1][1] - (gridSize - 1);
            newPositions.forEach((pos) => (pos[1] -= offset)); // Move left to fit within grid
          }
        } else {
          // Rotate to vertical
          const [startRow, startCol] = currentPositions[0];
          for (let i = 0; i < sizeInCells; i++) {
            newPositions.push([startRow + i, startCol]);
          }

          // Check for overflow and adjust if necessary
          const overflow = newPositions.some((pos) => pos[0] >= gridSize);
          if (overflow) {
            const offset =
              newPositions[newPositions.length - 1][0] - (gridSize - 1);
            newPositions.forEach((pos) => (pos[0] -= offset)); // Move up to fit within grid
          }
        }

        // Update positions
        return prev.map((square, index) =>
          index === squareIndex ? { ...square, position: newPositions } : square
        );
      }
      return prev; // Return unchanged if no square is found
    });
  };

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
          onClick={() => handleBoxClick(square.id, square.size)}
        />
      ))}
    </div>
  );
};

export default DropGrid;
