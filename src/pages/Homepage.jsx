import { HomeItem } from "../styles/MusicStyles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <HomeItem>
        <Link to="/pianoscales">
          <span>Piano Scales</span>
        </Link>
      </HomeItem>
      <HomeItem>
        <Link to="/pianochords">
          <span>Chords</span>
        </Link>
      </HomeItem>
    </>
  );
};
export default Homepage;
