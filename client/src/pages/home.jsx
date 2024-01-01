/* eslint-disable no-unused-vars */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { CustomButton } from "../component";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

function Home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {Snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-20 h-20 object-contain"
            />
          </motion.header>
          <motion.div className="home-content max-w-md" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">Let Creativity flow</h1>
            </motion.div>
          </motion.div>
					<motion.div {...headContainerAnimation}
					className="flex flex-col gap-5">
						<p className="max-w-md font-normal text-gray-600 text-base">
							Create your unique and exclusive shirt with our 3D style generator,{" "}
									costumize your style and let your creativity flow <strong>Unleash your Imagination</strong>{" "}
									and define your own style.
						</p>
						<CustomButton 
						type="filled"
						title=" Costumize It"
						handleClick={() => state.intro = false}
						customStyles="w-fit px-4 py-2.5 font-bold text-sm " 
						/>
					</motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
