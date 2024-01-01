/* eslint-disable no-unused-vars */
import Home from "./pages/home";
import CanvasComponent from "../src/canvas/canvas"
import Costumizer from "./pages/costumizer";

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasComponent />
      <Costumizer />
    </main>
  );
}

export default App;
