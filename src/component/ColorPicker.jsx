/* eslint-disable no-unused-vars */
// import React from "react";
import { SketchPicker } from "react-color"; //use color picker from react library 
import { useSnapshot } from "valtio"; //personalize hook 
import state from "../store"; // import self made state 

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return <div 
  className="absolute left-full ml-3"
  >
    <SketchPicker 
    color={snap.color}
    disableAlpha
    // presetColors={['#somecolor','#somecolor','#somecolor','#somecolor']} => this is for adding personlize presets
    onChange={(color)=> state.color = color.hex}
    />
  </div>;
};

export default ColorPicker;
