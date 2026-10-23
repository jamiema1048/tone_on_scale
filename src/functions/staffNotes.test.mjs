import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { spellStaffNote } from "./staffNotes.js";

const { scales } = JSON.parse(readFileSync(new URL("./scales.json", import.meta.url), "utf8"));
const scale = (name) => scales.find((entry) => entry.name === name);
const major = scale("Natural Major");
const minor = scale("Natural Minor");

function midi(note) {
  const [, letter, signs, octave] = note.match(/^([A-G])([#b]*)(-?\d+)$/);
  const natural = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[letter];
  return (Number(octave) + 1) * 12 + natural
    + [...signs].reduce((total, sign) => total + (sign === "#" ? 1 : -1), 0);
}

test("sharp/flat major keys also respell wrong black keys", () => {
  for (const root of ["D", "E"]) {
    assert.equal(spellStaffNote("Eb4", root, major), "D#4");
    assert.equal(spellStaffNote("Ab4", root, major), "G#4");
    assert.equal(spellStaffNote("Bb4", root, major), "A#4");
  }
  for (const root of ["Eb", "Ab"]) {
    assert.equal(spellStaffNote("C#4", root, major), "Db4");
    assert.equal(spellStaffNote("F#4", root, major), "Gb4");
  }
});

test("white keys use theoretical scale names with the correct octave", () => {
  assert.equal(spellStaffNote("F4", "C#", major), "E#4");
  assert.equal(spellStaffNote("C4", "C#", major), "B#3");
  assert.equal(spellStaffNote("C6", "C#", major), "B#5");
  assert.equal(spellStaffNote("B3", "Gb", major), "Cb4");
  assert.equal(spellStaffNote("E4", "Cb", major), "Fb4");
  assert.equal(spellStaffNote("F4", "F#", major), "E#4");
});

test("minor keys and altered scale degrees override the general preference", () => {
  assert.equal(spellStaffNote("Db4", "E", minor), "C#4");
  assert.equal(spellStaffNote("Gb4", "C", minor), "Gb4");
  assert.equal(spellStaffNote("Db4", "D", scale("Harmonic Minor")), "C#4");
  assert.equal(spellStaffNote("Eb4", "D", scale("Harmonic Minor")), "Eb4");
  assert.equal(spellStaffNote("G4", "G#", scale("Harmonic Minor")), "F##4");
  assert.equal(spellStaffNote("F4", "C", scale("Lydian Major")), "F4");
  assert.equal(spellStaffNote("Gb4", "C", scale("Lydian Major")), "F#4");
});

test("blues scales retain their altered third and fifth spellings", () => {
  assert.equal(spellStaffNote("D#4", "C", scale("Blues Major")), "Eb4");
  assert.equal(spellStaffNote("F#4", "C", scale("Blues Minor")), "Gb4");
  assert.equal(spellStaffNote("C4", "A", scale("Blues Major")), "C4");
});

test("changing the selected key respells the existing note; neutral keys keep flats", () => {
  assert.equal(spellStaffNote("Db4", "D", major), "C#4");
  assert.equal(spellStaffNote("Db4", "Eb", major), "Db4");
  assert.equal(spellStaffNote("Db4", "C", major), "Db4");
  assert.equal(spellStaffNote("Db4", "A", minor), "Db4");
  assert.equal(spellStaffNote(null, "D", major), null);
  assert.equal(spellStaffNote("Db4"), "Db4");
});

test("all supported scales/roots preserve sounding pitch across the keyboard", () => {
  const majorRoots = ["C", "C#", "Db", "D", "Eb", "E", "F", "F#", "Gb", "G", "Ab", "A", "Bb", "B", "Cb"];
  const minorRoots = ["A", "A#", "Bb", "B", "C", "C#", "D", "D#", "Eb", "E", "F", "F#", "G", "G#", "Ab"];
  const pitches = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  for (const entry of scales) {
    for (const root of entry.mode === "Minor" ? minorRoots : majorRoots) {
      for (let octave = 3; octave <= 6; octave++) {
        for (const pitch of pitches) {
          if (octave === 6 && pitch !== "C") continue;
          const input = `${pitch}${octave}`;
          const result = spellStaffNote(input, root, entry);
          assert.equal(midi(result), midi(input), `${root} ${entry.name}: ${input} -> ${result}`);
          assert.match(result, /^[A-G](?:#{1,2}|b{1,2})?-?\d+$/);
        }
      }
    }
  }
});
