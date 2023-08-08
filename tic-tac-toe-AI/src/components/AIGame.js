import { useState, useEffect } from "react";

const AIGame = () => {
  const [gameState, setGameState] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const evaluate = (b) => {
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
      if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
        if (b[row][0] === "O") return +10;
        else if (b[row][0] === "X") return -10;
      }
    }
    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
      if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
        if (b[0][col] === "O") return +10;
        else if (b[0][col] === "X") return -10;
      }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      if (b[0][0] === "O") return +10;
      else if (b[0][0] === "X") return -10;
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      if (b[0][2] === "O") return +10;
      else if (b[0][2] === "X") return -10;
    }

    // Else if none of them have won then return 0
    return 0;
  };

  const minimax = (board, depth, isMax) => {
    let score = evaluate(board);
    if (score === 10) return score;
    if (score === -10) return score;
    if (checkTie() === true) return 0;
    // If this maximizer's move
    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] === "") {
            // Make the move
            board[i][j] = "O";

            // Call minimax recursively and choose
            // the maximum value
            best = Math.max(best, minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = "";
          }
        }
      }
      return best;
    } else {
      let best = 1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell is empty
          if (board[i][j] === "") {
            // Make the move
            board[i][j] = "X";

            // Call minimax recursively and choose
            // the minimum value
            best = Math.min(best, minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = "";
          }
        }
      }
      return best;
    }
  };

  const AImove = () => {
    let bestVal = -1000;
    let board;
    let row = -1,
      col = -1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board = gameState;
        if (board[i][j] === "") {
          board[i][j] = "O";
          let moveVal = minimax(board, 0, false);
          board[i][j] = "";
          if (moveVal > bestVal) {
            row = i;
            col = j;
            bestVal = moveVal;
          }
        }
      }
    }
    board[row][col] = "O";
    setGameState(board);
  };

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

  useEffect(() => {
    if (playerTurn === "O") {
      if (winner !== null || isTie === true) return;
      AImove();
      findWinner();
      setIsTie(checkTie());
      setTimeout(() => {
        setPlayerTurn(playerTurn === "X" ? "O" : "X");
      }, 500);
    }
  }, [playerTurn]);

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
    newGameState[row][col] = "X";
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
          <div className="w-screen text-center mb-14 text-2xl text-slate-500">Playing Against the computer</div>
          <div className="w-screen text-center mb-10 text-xl">
            {winner !== null
              ? (winner === "X" ? "You are" : "AI is") + " winner!"
              : isTie === true
              ? `It's a DRAW!`
              : playerTurn === "X"
              ? "Play your move"
              : "Computer is playing...."}
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
};

export default AIGame;
