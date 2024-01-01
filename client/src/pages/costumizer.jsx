/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePickers,
  Tab,
} from "../component";

const Costumizer = () => {
  const snap = useSnapshot(state); // acces to custom state.

//state for accepting file 
  const [ file, setFile ] = useState('');

//  state for Ai prompt menu 
const [ prompt, setPrompt] = useState(''); 

// state for generating image loading 
const [generateImg, setGenerateImg]=useState(false);

// aditional state for active deactive state 
const [ activeEditorTabs, setActiveEditorTabs] = useState('');
const [ activeFilterTabs, setActiveFillterTabs] = useState({  //set usestate as an object to be pass to function latter
  logoShirt: true,
  stylishShirt: false,
})


// create new function to show tab content depending on the active tab 
  const generateTabContent = () => {
    switch (activeEditorTabs) {
      case "colorpicker":
        return<ColorPicker />;
      case "filepicker":
        return <FilePickers 
        file={file}
        setFile={setFile}
        readFile={readFile}
        />;
      case "aipicker":
        return <AiPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generateImg={generateImg}
        handleSubmit={handleSubmit}
        />
      default:
        return (null);
    }
  }
// handle submit AI prompt menu 
const handleSubmit = async (type) => {
  if(!prompt) {
    return alert ('what design you wanna create?')
  } else {
    try {
      // call backend URL to generate ai image
      setGenerateImg(true)

      // get response from backend 
      const response = await fetch('http://localhost:8080/api/v1/dalle',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          prompt,
        })
      })
      const data = await response.json()

      // call handleDecals function to handle result 
      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGenerateImg(false);
      setActiveEditorTabs("");
    }
  }
}

// handle decals function to get data from user file 
  const handleDecals = ( type, result ) => {
    const decalTypes = DecalTypes[type];
    state[decalTypes.stateProperty] = result; //update state at ../store directories 

    if(!activeFilterTabs[decalTypes.FilterTabs]){
      handleActiveFilterTab(decalTypes.FilterTabs);

    }
  }
//  handle active filter tabs function 
const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case "logoshirt":
      state.isLogoTexture = !activeFilterTabs[tabName]; //this value is from the state line 34-35
      break;
    case "stylishShirt":
      state.isFullTexture = !activeFilterTabs[tabName];
      break;
    default:
      state.isFullTexture = false;
      state.isLogoTexture = true;
      break;
  }

  // after changing the state with conditional switch statement, need to update activeFilterTabs 
  setActiveFillterTabs((prevState)=> {
    return {
      ...prevState,
      [tabName]: !prevState[tabName]
    }
  })
}

  // define function for reading the user file 
  const readFile = ( type ) => {
    reader(file)
      .then((result)=> {
        handleDecals(type,result);
        setActiveEditorTabs("")
      })
  }


  return (
    <AnimatePresence>
      {!snap.intro && ( //jsx syntax for emmbeded conditional
        <>
          {/* side nav for costumizing menu */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTabs(tab.name)} /> // invoke state to set tab name that will be use in conditional below
                ))}
                {/* call the generateTabContent as a conditional logic for Editor tab func */}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          {/* costumizer "Go Back" button */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm "
            />
          </motion.div>
          {/* costumize pallete */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
              key={tab.name} 
              tab={tab} 
              isFilterTab  
              isActiveTab={activeFilterTabs[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Costumizer;
