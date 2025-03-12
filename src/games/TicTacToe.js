import { useState, useEffect } from "react";
import "../styles/TicTacToe.css";

const TicTacToe = ({ setScreen }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (!xIsNext && !checkWinner(board) && board.includes(null)) {
      const aiMove = findBestMove(board);
      if (aiMove !== -1) {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[aiMove] = "O"; // AI is "O"
          setBoard(newBoard);
          setXIsNext(true);
        }, 200); // Faster AI move
      }
    }
  }, [xIsNext, board]);

  const handleClick = (index) => {
    if (board[index] || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = "X"; // Player is "X"
    setBoard(newBoard);
    setXIsNext(false); // Switch turn
  };

  const checkWinner = (squares) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // Returns 'X' or 'O' if there is a winner
      }
    }
    return null;
  };

  const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = -1;
    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = "O";
        let score = minimax(board, false);
        board[index] = null;
        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });
    return move;
  };

  const minimax = (board, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === "X") return -10;
    if (winner === "O") return 10;
    if (!board.includes(null)) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "O";
          let score = minimax(board, false);
          board[index] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = "X";
          let score = minimax(board, true);
          board[index] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="tic-tac-toe-container">
      <h1>Unbeatable Tic-Tac-Toe</h1>
      {checkWinner(board) || !board.includes(null) ? (
        <button className="reset-button" onClick={resetGame}>
          Restart Game
        </button>
      ) : null}
      <button className="back-button" onClick={() => setScreen("home")}>
        ⬅ Back to Home
      </button>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
