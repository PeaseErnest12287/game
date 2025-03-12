import "../styles/HomePage.css";

const Home = ({ setScreen }) => {
  return (
    <div className="home-container">
      <h1>Welcome to the Game Zone 🎮</h1>
      <p>Select a game to play:</p>

      <div className="game-buttons">
        <button onClick={() => setScreen("tictactoe")}>Tic-Tac-Toe</button>
        <button onClick={() => setScreen("rockpaperscissors")}>
          Rock, Paper, Scissors
        </button>
        {/* More games will be added here */}
      </div>
    </div>
  );
};

export default Home;
