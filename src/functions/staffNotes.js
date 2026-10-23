const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const NATURAL_PITCHES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const SHARP_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const FLAT_MAJOR_ROOTS = new Set(["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"]);
const FLAT_MINOR_ROOTS = new Set(["D", "G", "C", "F", "Bb", "Eb", "Ab"]);
// Blues scales repeat a letter for the altered third/fifth rather than using
// consecutive letters as seven-note scales do.
const BLUES_DEGREES = {
  "Blues Major": [0, 1, 2, 2, 4, 5],
  "Blues Minor": [0, 2, 3, 4, 4, 6],
};

const pitchClass = (value) => ((value % 12) + 12) % 12;
const alteration = (accidental) => [...accidental].reduce(
  (total, sign) => total + (sign === "#" ? 1 : -1), 0
);

function scaleSpellings(root, scale) {
  const [, letter, accidental] = root.match(/^([A-G])([#b]*)$/);
  const tonic = pitchClass(NATURAL_PITCHES[letter] + alteration(accidental));
  const startLetter = LETTERS.indexOf(letter);
  const degrees = scale.intervals.length === 7
    ? [0, 1, 2, 3, 4, 5, 6]
    : BLUES_DEGREES[scale.name];
  if (!degrees) return [];

  return scale.intervals.map((interval, index) => {
    const degreeLetter = LETTERS[(startLetter + degrees[index]) % 7];
    const targetPitch = pitchClass(tonic + interval);
    const offset = pitchClass(targetPitch - NATURAL_PITCHES[degreeLetter] + 6) - 6;
    return {
      pitch: targetPitch,
      letter: degreeLetter,
      offset,
      accidental: offset < 0 ? "b".repeat(-offset) : "#".repeat(offset),
    };
  });
}

function prefersFlats(root, scale, spellings) {
  const hasFlats = spellings.some(({ offset }) => offset < 0);
  const hasSharps = spellings.some(({ offset }) => offset > 0);
  if (hasFlats !== hasSharps) return hasFlats;
  if (root.includes("b")) return true;
  if (root.includes("#")) return false;
  // Mixed-accidental scales retain their underlying major/minor key's spelling.
  // Neutral C major/A minor retain the previous flat spelling for wrong notes.
  if (root === (scale.mode === "Minor" ? "A" : "C")) return true;
  return (scale.mode === "Minor" ? FLAT_MINOR_ROOTS : FLAT_MAJOR_ROOTS).has(root);
}

/** Change only a staff note's spelling, preserving its sounding pitch/octave. */
export function spellStaffNote(note, root, scale) {
  if (!note || !root || !scale?.intervals || !/^([A-G])([#b]*)$/.test(root)) return note;
  const input = note.match(/^([A-G])([#b]*)(-?\d+)$/);
  if (!input) return note;

  const [, inputLetter, inputAccidental, inputOctave] = input;
  const midi = (Number(inputOctave) + 1) * 12
    + NATURAL_PITCHES[inputLetter] + alteration(inputAccidental);
  const pitch = pitchClass(midi);
  const spellings = scaleSpellings(root, scale);
  // A scale degree's theoretical spelling takes priority over the general
  // sharp/flat preference, including white keys and double accidentals.
  let spelling = spellings.find((candidate) => candidate.pitch === pitch);
  if (!spelling) {
    const names = prefersFlats(root, scale, spellings) ? FLAT_NAMES : SHARP_NAMES;
    const name = names[pitch];
    spelling = {
      letter: name[0],
      accidental: name.slice(1),
      offset: alteration(name.slice(1)),
    };
  }

  // C4 = B#3 and B3 = Cb4: derive octave from the spelled natural letter.
  const octave = (midi - NATURAL_PITCHES[spelling.letter] - spelling.offset) / 12 - 1;
  return `${spelling.letter}${spelling.accidental}${octave}`;
}
