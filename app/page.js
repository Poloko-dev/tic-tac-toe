"use client";
import Square from "./Components/Square";
import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xcount, setXCount] = useState(0);
  const [ocount, setOCount] = useState(0);
  const [winner, setWinner] = useState("");
  const [winningSquares, setWinningSquares] = useState([]);

  const winningComninations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Prevents overwriting a square if it has already been clicked and alternates between 'X' and 'O'
  const handleSquareClick = (index) => {
    if (squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    if (isXNext) {
      setXCount(xcount + 1);
    } else {
      setOCount(ocount + 1);
    }

    // Only start processing the winner when there are enough symbols
    if (xcount >= 2) {
      const result = getWinner(newSquares);
      if (result !== null) {
        setWinner(result);
      }

      if (newSquares.every((val) => val !== null)) {
        setSquares(Array(9).fill(null));
        setOCount(0);
        setXCount(0);
        setWinner("");
      }
    }
  };

  // Function to determine the winner based on the current state of the squares checking all winning combinations
  const getWinner = (squares) => {
    for (let combination of winningComninations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinningSquares(combination);
        return squares[a];
      }
    }
    setWinningSquares([]);
    return null;
  };

  const handleBoardReset = () => {
    setSquares(Array(9).fill(null));
    setOCount(0);
    setXCount(0);
    setWinner("");
    setWinningSquares([]);
  };

  const displayWinner = (winner) => {
    if (winner) {
      return (
        <>
          <h1>The Winner is player {winner}</h1>
          <div className="reset-button">
            <button onClick={handleBoardReset}>Reset</button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="player">Player {isXNext ? "X" : "O"}</h1>
        <div className="board">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
              disableClick={winner !== null && winner !== ""}
              isWinning={winningSquares.includes(index)}
            />
          ))}
        </div>
        <div className="game-info">{displayWinner(winner)}</div>
      </div>
    </>
  );
}
