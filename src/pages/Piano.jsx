import React, { useState } from "react";
import PianoKeyboard from "../functions/tone.fn";
const Piano = () => {
  return (
    <div className="relative flex flex-col items-center w-screen border border-solid border-green-400">
      <h1 className="mb-9">Piano</h1>
      <PianoKeyboard />
    </div>
  );
};
export default Piano;
