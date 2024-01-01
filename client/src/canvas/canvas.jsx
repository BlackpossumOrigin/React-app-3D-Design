/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import MainItem from "../canvas/MainItem";
import CameraView from "../canvas/CameraView";
import Backdrop from "./Backdrop";

// implement three.js in for app in this file

const CanvasComponent = () => {
  return (
    <Canvas 
    shadows
    camera={{position:[0, 0, 0], fov:25 }}
    gl={{preserveDrawingBuffer:true}}
    className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />


      <CameraView>
        <Backdrop />
        <Center>
          <MainItem />
        </Center>
      </CameraView>
    </Canvas>
  );
};

export default CanvasComponent;
