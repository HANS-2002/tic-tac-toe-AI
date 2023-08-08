import { useState } from "react";

export default function MultiplayerOffline() {
  const [gameState, setGameState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const checkTie = () => {
    let tie = true;
    gameState.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "") {
          tie = false;
        }
      });
    });
    return tie;
  };

  const findWinner = () => {
    const possibleWins = [
      [gameState[0][0], gameState[0][1], gameState[0][2]],
      [gameState[1][0], gameState[1][1], gameState[1][2]],
      [gameState[2][0], gameState[2][1], gameState[2][2]],
      [gameState[0][0], gameState[1][0], gameState[2][0]],
      [gameState[0][1], gameState[1][1], gameState[2][1]],
      [gameState[0][2], gameState[1][2], gameState[2][2]],
      [gameState[0][0], gameState[1][1], gameState[2][2]],
      [gameState[2][0], gameState[1][1], gameState[0][2]],
    ];

    possibleWins.forEach((cells) => {
      if (cells.every((cell) => cell === "X")) {
        setWinner("X");
      } else if (cells.every((cell) => cell === "O")) {
        setWinner("O");
      }
    });
  };

  const handleCellClick = (e) => {
    e.preventDefault();
    if (winner !== null || isTie === true) return;
    const name = e.target.getAttribute("name");
    const row = parseInt(name[0]);
    const col = parseInt(name[2]);
    // console.log('Clicked on cell: ', row, col);
    if (gameState[row][col] !== "") {
      return;
    }

    const newGameState = [...gameState];
    newGameState[row][col] = playerTurn;
    setGameState(newGameState);

    findWinner();
    setIsTie(checkTie());
    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="game flex flex-col w-screen flex-grow justify-center items-center">
          <div className="w-screen text-center mb-14 text-2xl text-slate-500">
            Playing Against your Friend Offline
          </div>
          <div className="w-screen text-center mb-10 text-xl">
            {winner !== null
              ? `${winner} has won!`
              : isTie === true
              ? `It's a DRAW!`
              : `Play move for ${playerTurn}`}
          </div>
          <div className="flex flex-col w-full items-center ">
            <div className="row flex flex-row">
              <div
                onClick={handleCellClick}
                name="0 0"
                className="border-right border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[0][0]}
              </div>
              <div
                onClick={handleCellClick}
                name="0 1"
                className="border-right border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[0][1]}
              </div>
              <div
                onClick={handleCellClick}
                name="0 2"
                className="border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[0][2]}
              </div>
            </div>
            <div className="row flex flex-row">
              <div
                onClick={handleCellClick}
                name="1 0"
                className="border-right border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[1][0]}
              </div>
              <div
                onClick={handleCellClick}
                name="1 1"
                className="border-right border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[1][1]}
              </div>
              <div
                onClick={handleCellClick}
                name="1 2"
                className="border-bottom gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[1][2]}
              </div>
            </div>
            <div className="row flex flex-row">
              <div
                onClick={handleCellClick}
                name="2 0"
                className="border-right gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[2][0]}
              </div>
              <div
                onClick={handleCellClick}
                name="2 1"
                className="border-right gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[2][1]}
              </div>
              <div
                onClick={handleCellClick}
                name="2 2"
                className="gameText basis-4/12 text-center h-28 w-28 p-2"
              >
                {gameState[2][2]}
              </div>
            </div>
          </div>
          <div className="resetBtn" onClick={reload}>
            RESET
          </div>
        </div>
      </div>
    </>
  );
}
