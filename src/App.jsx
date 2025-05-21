import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import "./App.css";
import Piano from "./pages/Piano";
import Chords from "./pages/Chords";

// window.addEventListener("keydown", playNote);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="pianoscales" element={<Piano />}></Route>
          <Route path="pianochords" element={<Chords />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
