"use client";

import DraggableSquare from "@/components/test/DraggableSquare";
import DropGrid from "@/components/test/DropGrid";
import React from "react";

export default function Create() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl text-stone-900">Create room</h1>
      <label className="text-md text-stone-600" htmlFor="room">
        Name
      </label>
      <input id="room" type="text" placeholder="room name" />
      <label className="text-md text-stone-600" htmlFor="select-position">
        Select your position
      </label>
      <div className="flex gap-1" id="select-position">
        <DraggableSquare />
        <DraggableSquare size={40} />
        <DraggableSquare size={60} />
        <DraggableSquare size={80} />
        <DraggableSquare size={100} />
        <DropGrid />
      </div>
    </div>
  );
}
