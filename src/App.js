import { useState } from "react";
import HomePage from "./components/HomePage";
import TicTacToe from "./games/TicTacToe";

function App() {
  const [currentScreen, setCurrentScreen] = useState("home"); // State to track screen

  return (
    <div>
      {currentScreen === "home" && <HomePage setScreen={setCurrentScreen} />}
      {currentScreen === "tictactoe" && (
        <TicTacToe setScreen={setCurrentScreen} />
      )}
    </div>
  );
}

export default App;
