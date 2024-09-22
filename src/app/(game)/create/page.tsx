"use client";

import GameBoard from "@/components/GameBoard";
import Ship from "@/components/Ship";
import DraggableSquare from "@/components/test/DraggableSquare";
import DropGrid from "@/components/test/DropGrid";
import React from "react";

const GridSelector = () => {
  return <div></div>;
};

export default function Create() {
  const [ships] = React.useState([5, 4, 3, 3, 2]); // Example ship sizes

  const handleCellClick = (row: number, col: number) => {
    console.log(`Clicked on cell: Row ${row}, Column ${col}`);
  };

  const handleShipDrop = (row: number, col: number, size: number) => {
    console.log(`Dropped a ship of size ${size} at Row ${row}, Column ${col}`);
    // Add logic for placing the ship on the grid here
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl text-stone-900">Create room</h1>
      <label className="text-md text-stone-600" htmlFor="room">
        Name
      </label>
      <input id="room" type="text" placeholder="room name" />
      <div className="flex">
        <DraggableSquare size={40} />
        <DraggableSquare size={60} />
        <DraggableSquare />
      </div>

      <DropGrid />
    </div>
  );
}
