import { proxy } from "valtio";

// initialize state from valtio 
const state = proxy({
    // define react context for utilies in home.jsx 
    intro: true,
    color:"#EFBD48",
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal:'./threejs.png',
    fullDecal:'./threejs.png',
    
});

export default state;
