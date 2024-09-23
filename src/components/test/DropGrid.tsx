import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";

const DropGrid: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<number[][]>([]);
  const hovered = useRef<number>();
  const [squares, setSquares] = useState<number[][]>([
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]); // Track dropped squares (0 for empty, 1 for occupied)
  const [droppedSquares, setDroppedSquares] = useState<number[][]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop(() => ({
    accept: "SQUARE",
    hover: (item: { id: string; size: number }, monitor) => {
      if (!gridRef.current) return;

      const gridRect = gridRef.current.getBoundingClientRect();
      const dropPosition = monitor.getClientOffset();

      if (dropPosition) {
        const relativeX = dropPosition.x - gridRect.left;
        const relativeY = dropPosition.y - gridRect.top;
        console.log("relativeX", relativeX);
        console.log("relativeY", relativeY);
        console.log("gridRect", gridRect);
        console.log("dropPosition", dropPosition);

        const cellSize = 20; // Each cell is 20px
        const column = Math.floor(relativeX / cellSize);
        const row = Math.floor(relativeY / cellSize);
        console.log("column", column);
        console.log("row", row);

        // Determine how many rows the rectangle will cover based on its size (height)
        const numberOfRows = Math.ceil(item.size / cellSize);
        console.log("numberOfRows", numberOfRows);
        // Ensure the calculated column and row are within grid bounds
        if (column >= 0 && column < 10 && row >= 0 && row < 10) {
          const hoveredCells = [];
          for (let i = 0; i < numberOfRows; i++) {
            if (row + i < 10) {
              // Collect all the cells that the rectangle will hover over
              hoveredCells.push([row + i, column]);
            }
          }
          setHoveredCell(hoveredCells); // Store all the hovered cells (rows and columns)
        }
      }
    },
    drop: (item: { id: string; size: number }) => {
      if (!hovered.current) return;

      // Calculate how many rows the dropped rectangle occupies
      const numberOfRows = Math.ceil(item.size / 20); // item.size is the height of the rectangle in pixels

      // Calculate the starting row and column from hovered.current
      const startRow = Math.floor(hovered.current / 10);
      const startColumn = hovered.current % 10;

      const newDroppedSquares: number[][] = [];

      // Collect all the row/column pairs that the rectangle occupies
      for (let i = 0; i < numberOfRows; i++) {
        if (startRow + i < 10) {
          newDroppedSquares.push([startRow + i, startColumn]); // Push each occupied cell
        }
      }

      // Update the droppedSquares state with the new cells
      setDroppedSquares((prev) => [...prev, ...newDroppedSquares]);
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
      {squares.map((rowArray, rowIndex) =>
        rowArray.map((cell, columnIndex) => (
          <button
            onClick={() => {
              /*rotate*/
            }}
            key={`${rowIndex}-${columnIndex}`}
            className={clsx("w-5 h-5 block", {
              "bg-stone-500": hoveredCell?.some(
                ([r, c]) => r === rowIndex && c === columnIndex
              ),
              "bg-stone-600": droppedSquares.some(
                ([r, c]) => r === rowIndex && c === columnIndex
              ),
              "bg-stone-300": !hoveredCell?.some(
                ([r, c]) => r === rowIndex && c === columnIndex
              ),
            })}
          >
            {/* {cell} */}
          </button>
        ))
      )}
    </div>
  );
};

export default DropGrid;
