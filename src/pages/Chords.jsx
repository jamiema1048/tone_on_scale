import { LearningPage, PageTitle } from "../styles/MusicStyles";
import React, { useState } from "react";
import PianoChord from "../functions/chord.fn";
const Chords = () => {
  return (
    <LearningPage>
      <PageTitle>Chords</PageTitle>
      <PianoChord />
    </LearningPage>
  );
};
export default Chords;
