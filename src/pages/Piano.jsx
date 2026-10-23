import { LearningPage, PageTitle } from "../styles/MusicStyles";
import React, { useState } from "react";
import PianoKeyboard from "../functions/tone.fn";
const Piano = () => {
  return (
    <LearningPage>
      <PageTitle>Piano</PageTitle>
      <PianoKeyboard />
    </LearningPage>
  );
};
export default Piano;
