/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  // create a ref for control the shadow area

  const Shadows = useRef();
  return (
    <AccumulativeShadows
      ref={Shadows}
      position={[0, 0, -0.14]}
      temporal
      frames={60} //shadow will render in 60 frame
      alphaTest={0.35} // set the conspiracy of the shadow
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        amount={2}
        radius={1}
        intensity={0.6}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
