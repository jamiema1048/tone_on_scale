import React, { useState } from "react";
import "./App.css";
import PianoKeyboard from "./functions/tone.fn.jsx";

// window.addEventListener("keydown", playNote);

function App() {
  return (
    <div className="relative flex flex-col items-center w-screen border border-solid border-green-400">
      <h1 className="mb-9">Piano</h1>
      <PianoKeyboard />
      {/* <div className="chord">
        <div className="nature">
          <h1>Nature</h1>
          <div className="nature-chords">
            <div className="nature-triad">
              <h2>Triad</h2>
              <button
                className="chord-btn"
                id="Eb"
                onClick={() => playEb(activeNotes, setActiveNotes)}
              >
                E♭
              </button>
              <button
                className="chord-btn"
                id="Fm"
                onClick={() => playFm(activeNotes, setActiveNotes)}
              >
                Fm
              </button>
              <button
                className="chord-btn"
                id="Gm"
                onClick={() => playGm(activeNotes, setActiveNotes)}
              >
                Gm
              </button>
              <button
                className="chord-btn"
                id="Ab"
                onClick={() => playAb(activeNotes, setActiveNotes)}
              >
                A♭
              </button>
              <button
                className="chord-btn"
                id="Bb"
                onClick={() => playBb(activeNotes, setActiveNotes)}
              >
                B♭
              </button>
              <button
                className="chord-btn"
                id="Cm"
                onClick={() => playCm(activeNotes, setActiveNotes)}
              >
                Cm
              </button>
              <button
                className="chord-btn"
                id="Do"
                onClick={() => playDo(activeNotes, setActiveNotes)}
              >
                D°
              </button>
            </div>
            <div className="nature-seventh">
              <h2>7th</h2>
              <button
                className="chord-btn"
                id="Ebmaj7"
                onClick={() => playEbmaj7(activeNotes, setActiveNotes)}
              >
                E♭Δ7
              </button>
              <button
                className="chord-btn"
                id="Fm7"
                onClick={() => playFm7(activeNotes, setActiveNotes)}
              >
                Fm7
              </button>
              <button
                className="chord-btn"
                id="Gm7"
                onClick={() => playGm7(activeNotes, setActiveNotes)}
              >
                Gm7
              </button>
              <button
                className="chord-btn"
                id="Abmaj7"
                onClick={() => playAbmaj7(activeNotes, setActiveNotes)}
              >
                A♭Δ7
              </button>
              <button
                className="chord-btn"
                id="Bb7"
                onClick={() => playBb7(activeNotes, setActiveNotes)}
              >
                B♭7
              </button>
              <button
                className="chord-btn"
                id="Cm7"
                onClick={() => playCm7(activeNotes, setActiveNotes)}
              >
                Cm7
              </button>
              <button
                className="chord-btn"
                id="DHalfDim7"
                onClick={() => playDHalfDim7(activeNotes, setActiveNotes)}
              >
                Dø7
              </button>
            </div>
          </div>
        </div>
        <div className="harmony">
          <h1>Harmony</h1>
          <div className="harmony-chords">
            <div className="harmony-triad">
              <h2>Triad</h2>
              <button
                className="chord-btn"
                id="Ebaug"
                onClick={() => playEbaug(activeNotes, setActiveNotes)}
              >
                E♭+
              </button>
              <button
                className="chord-btn"
                id="Fm"
                onClick={() => playFm(activeNotes, setActiveNotes)}
              >
                Fm
              </button>
              <button
                className="chord-btn"
                id="G"
                onClick={() => playG(activeNotes, setActiveNotes)}
              >
                G
              </button>
              <button
                className="chord-btn"
                id="Ab"
                onClick={() => playAb(activeNotes, setActiveNotes)}
              >
                A♭
              </button>
              <button
                className="chord-btn"
                id="Bo"
                onClick={() => playBo(activeNotes, setActiveNotes)}
              >
                B°
              </button>
              <button
                className="chord-btn"
                id="Cm"
                onClick={() => playCm(activeNotes, setActiveNotes)}
              >
                Cm
              </button>
              <button
                className="chord-btn"
                id="Do"
                onClick={() => playDo(activeNotes, setActiveNotes)}
              >
                D°
              </button>
            </div>
            <div className="harmony-seventh">
              <h2>7th</h2>
              <button
                className="chord-btn"
                id="Ebaugmaj7"
                onClick={() => playEbaugMaj7(activeNotes, setActiveNotes)}
              >
                E♭+Δ7
              </button>
              <button
                className="chord-btn"
                id="Fm7"
                onClick={() => playFm7(activeNotes, setActiveNotes)}
              >
                Fm7
              </button>
              <button
                className="chord-btn"
                id="G7"
                onClick={() => playG7(activeNotes, setActiveNotes)}
              >
                G7
              </button>
              <button
                className="chord-btn"
                id="Abmaj7"
                onClick={() => playAbmaj7(activeNotes, setActiveNotes)}
              >
                A♭Δ7
              </button>
              <button
                className="chord-btn"
                id="Bo7"
                onClick={() => playBo7(activeNotes, setActiveNotes)}
              >
                B°7
              </button>
              <button
                className="chord-btn"
                id="Cmmaj7"
                onClick={() => playCmMaj7(activeNotes, setActiveNotes)}
              >
                CmΔ7
              </button>
              <button
                className="chord-btn"
                id="Do"
                onClick={() => playDHalfDim7(activeNotes, setActiveNotes)}
              >
                Dø7
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
