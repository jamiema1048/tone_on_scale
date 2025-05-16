// import React, { useState } from "react";
// import {
//   startC3,
//   stopC3,
//   playDb3,
//   playD3,
//   playEb3,
//   playE3,
//   playF3,
//   playGb3,
//   playG3,
//   playAb3,
//   playA3,
//   playBb3,
//   playB3,
//   playC4,
//   playDb4,
//   playD4,
//   playEb4,
//   playE4,
//   playF4,
//   playGb4,
//   playG4,
//   playAb4,
//   playA4,
//   playBb4,
//   playB4,
//   playC5,
//   playNote,
// } from "./tone.fn.jsx";

// window.addEventListener("keydown", playNote);

// export function playEb(activeNotes, setActiveNotes) {
//   playEb3();
//   playG3();
//   playBb3();
//   setActiveNotes(["Eb3", "G3", "Bb3"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playFm(activeNotes, setActiveNotes) {
//   playF3();
//   playAb3();
//   playC4();
//   setActiveNotes(["F3", "Ab3", "C4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playGm(activeNotes, setActiveNotes) {
//   playG3();
//   playBb3();
//   playD4();
//   setActiveNotes(["G3", "Bb3", "D4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playAb(activeNotes, setActiveNotes) {
//   playAb3();
//   playC4();
//   playEb4();
//   setActiveNotes(["Ab3", "C4", "Eb4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playBb(activeNotes, setActiveNotes) {
//   playBb3();
//   playD4();
//   playF4();
//   setActiveNotes(["Bb3", "D4", "F4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playCm(activeNotes, setActiveNotes) {
//   playC4();
//   playEb4();
//   playG4();
//   setActiveNotes(["C4", "Eb4", "G4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300); // 300ms 之後取消高亮
// }
// export function playDo(activeNotes, setActiveNotes) {
//   playD4();
//   playF4();
//   playAb4();
//   setActiveNotes(["D4", "F4", "Ab4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playEbmaj7(activeNotes, setActiveNotes) {
//   playEb3();
//   playG3();
//   playBb3();
//   playD4();
//   setActiveNotes(["Eb3", "G3", "Bb3", "D4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playFm7(activeNotes, setActiveNotes) {
//   playF3();
//   playAb3();
//   playC4();
//   playEb4();
//   setActiveNotes(["F3", "Ab3", "C4", "Eb4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playGm7(activeNotes, setActiveNotes) {
//   playG3();
//   playBb3();
//   playD4();
//   playF4();
//   setActiveNotes(["G3", "Bb3", "D4", "F4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playAbmaj7(activeNotes, setActiveNotes) {
//   playAb3();
//   playC4();
//   playEb4();
//   playG4();
//   setActiveNotes(["Ab3", "C4", "Eb4", "G4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playBb7(activeNotes, setActiveNotes) {
//   playBb3();
//   playD4();
//   playF4();
//   playAb4();
//   setActiveNotes(["Bb3", "D4", "F4", "Ab4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playCm7(activeNotes, setActiveNotes) {
//   playC4();
//   playEb4();
//   playG4();
//   playBb4();
//   setActiveNotes(["C4", "Eb4", "G4", "Bb4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300); // 300ms 之後取消高亮
// }
// export function playDHalfDim7(activeNotes, setActiveNotes) {
//   playD4();
//   playF4();
//   playAb4();
//   playC5();
//   setActiveNotes(["D4", "F4", "Ab4", "C5"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playEbaug(activeNotes, setActiveNotes) {
//   playEb3();
//   playG3();
//   playB3();
//   setActiveNotes(["Eb3", "G3", "B3"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playG(activeNotes, setActiveNotes) {
//   playG3();
//   playB3();
//   playD4();
//   setActiveNotes(["G3", "B3", "D4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playBo(activeNotes, setActiveNotes) {
//   playB3();
//   playD4();
//   playF4();
//   setActiveNotes(["B3", "D4", "F4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playEbaugMaj7(activeNotes, setActiveNotes) {
//   playEb3();
//   playG3();
//   playB3();
//   playD4();
//   setActiveNotes(["Eb3", "G3", "B3", "D4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playG7(activeNotes, setActiveNotes) {
//   playG3();
//   playB3();
//   playD4();
//   playF4();
//   setActiveNotes(["G3", "B3", "D4", "F4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playBo7(activeNotes, setActiveNotes) {
//   playB3();
//   playD4();
//   playF4();
//   playAb4();
//   setActiveNotes(["B3", "D4", "F4", "Ab4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300);
// }
// export function playCmMaj7(activeNotes, setActiveNotes) {
//   playC4();
//   playEb4();
//   playG4();
//   playB4();
//   setActiveNotes(["C4", "Eb4", "G4", "B4"]);
//   setTimeout(() => {
//     setActiveNotes([]);
//     console.log(activeNotes);
//   }, 300); // 300ms 之後取消高亮
// }
