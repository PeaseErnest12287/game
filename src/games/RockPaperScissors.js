import { useState } from "react";
import "../styles/RockPaperScissors.css";

const choices = ["Rock", "Paper", "Scissors"];

const getWinner = (player, ai) => {
  if (player === ai) return "It's a Draw! 😐";
  if (
    (player === "Rock" && ai === "Scissors") ||
    (player === "Paper" && ai === "Rock") ||
    (player === "Scissors" && ai === "Paper")
  ) {
    return "You Win! 🎉";
  }
  return "You Lose! 😢";
};

const RockPaperScissors = ({ setScreen }) => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const randomIndex = Math.floor(Math.random() * 3);
    const aiRandomChoice = choices[randomIndex];

    setAiChoice(aiRandomChoice);
    setResult(getWinner(choice, aiRandomChoice));
  };

  return (
    <div className="rps-container">
      <h1>Rock, Paper, Scissors</h1>
      <button className="back-button" onClick={() => setScreen("home")}>
        ⬅ Back to Home
      </button>

      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice}
            className="choice-btn"
            onClick={() => playGame(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {playerChoice && (
        <div className="results">
          <p>
            You chose: <strong>{playerChoice}</strong>
          </p>
          <p>
            AI chose: <strong>{aiChoice}</strong>
          </p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
