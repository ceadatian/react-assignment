import React from "react";
import Home from "./pages/Home";
import { dishes } from "./data/dishes";
const App: React.FC = () => {
  return (
    <div className="App">
      <Home availableDishes={dishes}></Home>
    </div>
  );
}

export default App;
