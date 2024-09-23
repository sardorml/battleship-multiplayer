"use client";

import React from "react";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      {children}
    </DndProvider>
  );
}
