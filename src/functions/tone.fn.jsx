import PianoKeyFace from "../components/PianoKeyFace";
import {
  Controls,
  ScaleSelect,
  Keyboard,
  KeySlot,
  PianoKey,
  KeyLabel,
  StaffPanel,
} from "../styles/MusicStyles";
import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import scalesData from "./scales.json";
import MusicStaff from "./MusicStaff";

const majorRootNotes = [
  "C",
  "C#",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
  "Cb",
];
const minorRootNotes = [
  "A",
  "A#",
  "Bb",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "Ab",
];

const rootNoteFallbacks = {
  Gb: "F#",
  Cb: "B",
  "D#": "Eb",
  "G#": "Ab",
  "A#": "Bb",
};

const polySynth = new Tone.PolySynth().toDestination();

export default function PianoKeyboard() {
  const [currentNote, setCurrentNote] = useState(null);

  const noteNames = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];

  const [rootNote, setRootNote] = useState("C");
  const [scalesName, setScalesName] = useState(scalesData.scales[0].name);

  const selectedScale =
    scalesData.scales.find((scale) => scale.name === scalesName) ||
    scalesData.scales[0];


  useEffect(() => {
    const newSelectedScale = scalesData.scales.find(
      (s) => s.name === scalesName
    );
    const mode = newSelectedScale?.mode || "Major";

    const valid =
      mode === "Major"
        ? majorRootNotes.includes(rootNote)
        : minorRootNotes.includes(rootNote);

    if (!valid) {
      setRootNote(
        rootNoteFallbacks[rootNote] || (mode === "Major" ? "C" : "A")
      );
    }
  }, [scalesName, rootNote]);

  const selectedMode = selectedScale.mode;

  const rootNoteOptions =
    selectedMode === "Minor" ? minorRootNotes : majorRootNotes;

  const yellowNotes = selectedScale.intervals.map((interval) => {
    const fullNote = Tone.Frequency(rootNote + "4")
      .transpose(interval)
      .toNote();
    return fullNote.replace(/[0-9]/g, "");
  });

  function generateNotes(from = 3, to = 6) {
    const notes = [];
    for (let oct = from; oct <= to; oct++) {
      for (const n of noteNames) {
        if (oct === to && n !== "C") continue;
        notes.push(`${n}${oct}`);
      }
    }
    return notes;
  }

  const [activeNotes, setActiveNotes] = useState([]);

  function startNote(note) {
    if (!activeNotes.includes(note)) {
      polySynth.triggerAttack(note);
      setActiveNotes((prev) => [...prev, note]);
      setCurrentNote(note); // ★ 顯示在五線譜
    }
  }

  function stopNote(note) {
    polySynth.triggerRelease(note);
    setActiveNotes((prev) => prev.filter((n) => n !== note));
  }

  const notes = generateNotes(3, 6);

  const enharmonicLabels = {
    C: "C / B#",
    "C#": "C# / Db",
    Db: "C# / Db",
    D: "D",
    "D#": "D# / Eb",
    Eb: "D# / Eb",
    E: "E / Fb",
    F: "F / E#",
    "F#": "F# / Gb",
    Gb: "F# / Gb",
    G: "G",
    "G#": "G# / Ab",
    Ab: "G# / Ab",
    A: "A",
    "A#": "A# / Bb",
    Bb: "A# / Bb",
    B: "B / Cb",
  };

  return (
    <>
      {/* 上方選單 */}
      <Controls>
        <ScaleSelect
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value)}
        >
          {rootNoteOptions.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </ScaleSelect>

        <ScaleSelect
          value={scalesName}
          onChange={(e) => setScalesName(e.target.value)}
        >
          {scalesData.scales.map((scale) => (
            <option key={scale.id}>{scale.name}</option>
          ))}
        </ScaleSelect>
      </Controls>

      {/* 鋼琴鍵 */}
      <Keyboard>
        {notes.map((note) => {
          const pitch = note.slice(0, -1);
          const standardized = Tone.Frequency(pitch + "4")
            .toNote()
            .replace(/[0-9]/g, "");
          const isYellow = yellowNotes.includes(standardized);
          const isBlack = note.includes("b");

          return (
            <KeySlot key={note}>
              <PianoKey
                onMouseDown={() => startNote(note)}
                onMouseUp={() => stopNote(note)}
                onMouseLeave={() => stopNote(note)}
                onTouchStart={() => startNote(note)}
                onTouchEnd={() => stopNote(note)}
                $black={isBlack}
                $wrong={!isYellow}
                $active={activeNotes.includes(note)}
                $chords={false}
              >
                <PianoKeyFace black={isBlack} />
                <KeyLabel $black={isBlack}>
                  {isBlack
                    ? (enharmonicLabels[pitch] || pitch).split(/\s*\/\s*/).join("\n/\n")
                    : enharmonicLabels[pitch] || pitch}
                </KeyLabel>
              </PianoKey>
            </KeySlot>
          );
        })}
      </Keyboard>

      {/* 五線譜 */}
      <StaffPanel>
        <MusicStaff note={currentNote} rootNote={rootNote} scale={selectedScale} />
      </StaffPanel>
    </>
  );
}
