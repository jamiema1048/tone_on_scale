import React, { useState } from "react";
import PianoChord from "../functions/chord.fn";
const Chords = () => {
  return (
    <div className="relative flex flex-col items-center w-screen border border-solid border-green-400">
      <h1 className="mb-9">Chords</h1>
      <PianoChord />
    </div>
  );
};
export default Chords;
