import React, { useState } from "react";
import * as Tone from "tone";

const polySynth = new Tone.PolySynth().toDestination();
const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11]; // 全音音程
function PianoKeyboard() {
  // 常見的鋼琴音階順序（12 半音）

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
  const [rootNote, setRootNote] = useState("D");
  const yellowNotes = majorScaleIntervals.map((interval) => {
    const fullNote = Tone.Frequency(rootNote + "4")
      .transpose(interval)
      .toNote();
    return fullNote.replace(/[0-9]/g, ""); // 移除八度，留下 pitch
  });

  function generateNotes(from = 3, to = 6) {
    const notes = [];
    for (let octave = from; octave <= to; octave++) {
      for (const note of noteNames) {
        // C6 是最後一個，避免加到 C#6, D6...
        if (octave === to && note !== "C") continue;
        notes.push(`${note}${octave}`);
      }
    }
    return notes;
  }

  const [activeNotes, setActiveNotes] = useState([]);

  function startNote(note) {
    if (!activeNotes.includes(note)) {
      polySynth.triggerAttack(note);
      setActiveNotes([...activeNotes, note]);
    }
    console.log(activeNotes);
  }

  function stopNote(note) {
    polySynth.triggerRelease(note);
    setActiveNotes((prev) => prev.filter((n) => n !== note));
    console.log(activeNotes);
  }

  const notes = generateNotes(3, 6);

  return (
    <>
      <div className="mb-9">
        <select
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value)}
          className="mb-4 p-2 border rounded bg-yellow-400 text-purple-800"
        >
          {[
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
          ].map((note) => (
            <option key={note} value={note}>
              {note} Major
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full h-48 flex justify-center border border-solid border-red-400">
        {notes.map((note) => {
          const pitch = note.slice(0, -1); // "Gb"
          const standardized = Tone.Frequency(pitch + "4")
            .toNote()
            .replace(/[0-9]/g, ""); // "F#"
          const isYellow = yellowNotes.includes(standardized);

          const isBlack = note.includes("b");

          return (
            <div key={note} className="relative">
              <button
                onMouseDown={() => startNote(note)}
                onMouseUp={() => stopNote(note)}
                onMouseLeave={() => stopNote(note)}
                onTouchStart={() => startNote(note)}
                onTouchEnd={() => stopNote(note)}
                className={`border border-solid flex flex-col-reverse items-center relative transition-all duration-100
            ${
              isBlack
                ? `black-key w-12 h-28 ${
                    isYellow
                      ? "bg-yellow-400 text-purple-800"
                      : "wrong bg-red-500 text-purple-800"
                  } z-5 -m-9`
                : `white-key w-17 h-48 ${
                    isYellow
                      ? "bg-yellow-300 text-purple-800"
                      : "wrong bg-red-300 text-purple-800"
                  } z-1`
            }
            ${activeNotes.includes(note) ? "active" : ""}`}
              >
                {pitch}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default PianoKeyboard;
