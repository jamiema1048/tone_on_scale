import React, { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";
import scalesData from "./chords_scale.json";

const polySynth = new Tone.PolySynth().toDestination();
const PianoChord = () => {
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

  // 對應表（當前 note 無法在對應 mode 下使用時，自動轉換）
  const rootNoteFallbacks = {
    // 大調轉小調時
    Gb: "F#",
    Cb: "B",
    // 小調轉大調時
    "D#": "Eb",
    "G#": "Ab",
    "A#": "Bb",
  };

  const enharmonicLabels = {
    C: "C / B#",
    "C#": "C# / D♭",
    Db: "C# / D♭",
    D: "D",
    "D#": "D# / E♭",
    Eb: "D# / E♭",
    E: "E / F♭",
    F: "F / E#",
    "F#": "F# / G♭",
    Gb: "F# / G♭",
    G: "G",
    "G#": "G# / A♭",
    Ab: "G# / A♭",
    A: "A",
    "A#": "A# / B♭",
    Bb: "A# / B♭",
    B: "B / C♭",
  };

  const traidChordFormulas = {
    Major: [0, 4, 7],
    Minor: [0, 3, 7],
    Diminished: [0, 3, 6],
    Augmented: [0, 4, 8],
  };

  const seventhChordFormulas = {
    Major7: [0, 4, 7, 11],
    Minor7: [0, 3, 7, 10],
    Dominant7: [0, 4, 7, 10],
    HalfDiminished7: [0, 3, 6, 10],
    Diminished7: [0, 3, 6, 9],
    Augmented7: [0, 4, 8, 10],
    MinorMajor7: [0, 3, 7, 11],
    AugmentedMajor7: [0, 4, 8, 11],
  };

  function prefersSharps(note) {
    return note.includes("#");
  }
  function preferFlat(note) {
    const enharmonicMap = {
      "C#": "Db",
      "D#": "Eb",
      "F#": "Gb",
      "G#": "Ab",
      "A#": "Bb",
    };
    return enharmonicMap[note] || note;
  }

  function generateChordsInScale(root, scale) {
    if (
      !scale ||
      !scale.intervals ||
      !scale.triadChords ||
      !scale.seventhChords
    ) {
      console.error("Invalid scale data:", scale);
      return [];
    }
    const useSharps = prefersSharps(root);
    const baseMidi = Tone.Frequency(root + "3").toMidi();
    const chords = [];

    for (let i = 0; i < scale.intervals.length; i++) {
      const rootInterval = scale.intervals[i];
      const midi = (baseMidi + rootInterval) % 128;

      let chordRoot = Tone.Frequency(midi, "midi")
        .toNote()
        .replace(/[0-9]/g, "");
      if (!useSharps) chordRoot = preferFlat(chordRoot);

      // --- TRIAD ---
      const triadType = scale.triadChords[i];
      const triadFormula = traidChordFormulas[triadType];

      const triadNotes = triadFormula.map((interval) =>
        Tone.Frequency(root + "3")
          .transpose(rootInterval + interval)
          .toNote()
      );

      const triadNameSuffix =
        {
          Major: "",
          Minor: "m",
          Diminished: "°",
          Augmented: "+",
        }[triadType] || "";

      chords.push({
        name: `${chordRoot}${triadNameSuffix}`,
        notes: triadNotes,
        type: "triad",
      });

      // --- SEVENTH ---
      const seventhType = scale.seventhChords[i];
      const seventhFormula = seventhChordFormulas[seventhType];

      const seventhNotes = seventhFormula.map((interval) =>
        Tone.Frequency(root + "3")
          .transpose(rootInterval + interval)
          .toNote()
      );

      const seventhNameSuffix =
        {
          Major7: "Δ7",
          Minor7: "m7",
          Dominant7: "7",
          HalfDiminished7: "ø7",
          Diminished7: "°7",
          Augmented7: "+7",
          MinorMajor7: "mΔ7",
          AugmentedMajor7: "+Δ7",
        }[seventhType] || "";

      chords.push({
        name: `${chordRoot}${seventhNameSuffix}`,
        notes: seventhNotes,
        type: "seventh",
      });
    }

    return chords;
  }

  const chordsInScale = useMemo(() => {
    return generateChordsInScale(rootNote, selectedScale); // ✅ 修正：傳整個 scale 物件，而不是 intervals
  }, [rootNote, selectedScale]);

  useEffect(() => {
    const newSelectedScale = scalesData.scales.find(
      (scale) => scale.name === scalesName
    );
    const mode = newSelectedScale?.mode || "Major";

    const isValid =
      mode === "Major"
        ? majorRootNotes.includes(rootNote)
        : minorRootNotes.includes(rootNote);

    if (!isValid) {
      const fallback = rootNoteFallbacks[rootNote];
      if (fallback) {
        setRootNote(fallback);
      } else {
        setRootNote(mode === "Major" ? "C" : "A");
      }
    }
  }, [scalesName]);

  const selectedMode = selectedScale.mode; // "Major" or "Minor"

  const rootNoteOptions =
    selectedMode === "Minor" ? minorRootNotes : majorRootNotes; //Identify the scale is maj or min

  const yellowNotes = selectedScale.intervals.map((interval) => {
    const fullNote = Tone.Frequency(rootNote + "3")
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

  //correct black key but didn't shine problem
  function normalizeNote(note) {
    return Tone.Frequency(note).toNote();
  }

  function startNote(note) {
    const normalized = normalizeNote(note);
    polySynth.triggerAttack(normalized);
    setActiveNotes((prev) =>
      prev.includes(normalized) ? prev : [...prev, normalized]
    );
    console.log(activeNotes);
  }

  function stopNote(note) {
    const normalized = normalizeNote(note);
    polySynth.triggerRelease(normalized);
    setActiveNotes((prev) => prev.filter((n) => n !== normalized));
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
          {rootNoteOptions.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>
        <select
          value={scalesName}
          onChange={(e) => setScalesName(e.target.value)}
          className="mb-4 p-2 border rounded bg-yellow-400 text-purple-800"
        >
          {scalesData.scales.map((scale) => (
            <option key={scale.id} value={scale.name}>
              {scale.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full h-48 flex justify-center border border-solid border-red-400">
        {notes.map((note) => {
          const pitch = note.slice(0, -1); // "Gb"
          const standardized = Tone.Frequency(pitch + "3")
            .toNote()
            .replace(/[0-9]/g, ""); // "F#"
          const isYellow = yellowNotes.includes(standardized);

          const isBlack = note.includes("b");
          const normalized = Tone.Frequency(note).toNote(); // e.g., Gb3 → F#3
          const isActive = activeNotes.some(
            (n) => Tone.Frequency(n).toNote() === normalized //字串上不等於，但透過辨識Frequency去達成標準化
          );

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
                      ? "bg-yellow-300 text-purple-800"
                      : "wrong bg-red-500 text-purple-800"
                  } z-5 -m-9`
                : `white-key w-17 h-48 ${
                    isYellow
                      ? "bg-yellow-300 text-purple-800"
                      : "wrong bg-red-300 text-purple-800"
                  } z-1`
            }
            ${isActive ? "active" : ""}`}
              >
                {enharmonicLabels[pitch] || pitch}
              </button>
            </div>
          );
        })}
      </div>
      {/* 三和弦區域 */}
      <div className="flex flex-col items-center mb-6">
        <h3 className="mb-3 text-xl font-bold text-purple-700">Triads</h3>
        <div className="flex gap-3 flex-wrap justify-center">
          {chordsInScale
            .filter((chord) => chord.type === "triad")
            .map((chord, idx) => (
              <button
                key={`triad-${idx}`}
                onMouseDown={() => chord.notes.forEach(startNote)}
                onMouseUp={() => chord.notes.forEach(stopNote)}
                onMouseLeave={() => chord.notes.forEach(stopNote)}
                onTouchStart={() => chord.notes.forEach(startNote)}
                onTouchEnd={() => chord.notes.forEach(stopNote)}
                className="px-3 py-2 bg-purple-300 text-yellow-900 rounded shadow hover:bg-purple-400"
              >
                {chord.name}
              </button>
            ))}
        </div>
      </div>
      <div className="w-full border-t border-yellow-500 my-4" />

      {/* 七和弦區域 */}
      <div className="flex flex-col items-center mb-6">
        <h3 className="mb-3 text-xl font-bold text-purple-700">
          Seventh Chords
        </h3>
        <div className="flex gap-3 flex-wrap justify-center">
          {chordsInScale
            .filter((chord) => chord.type === "seventh")
            .map((chord, idx) => (
              <button
                key={`seventh-${idx}`}
                onMouseDown={() => chord.notes.forEach(startNote)}
                onMouseUp={() => chord.notes.forEach(stopNote)}
                onMouseLeave={() => chord.notes.forEach(stopNote)}
                onTouchStart={() => chord.notes.forEach(startNote)}
                onTouchEnd={() => chord.notes.forEach(stopNote)}
                className="px-3 py-2 bg-purple-300 text-yellow-900 rounded shadow hover:bg-purple-400"
              >
                {chord.name}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};
export default PianoChord;
