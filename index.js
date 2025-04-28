import readline from "readline";
import chalk from "chalk";

let board = Array(3)
  .fill()
  .map(() => Array(3).fill(" "));
let currentPlayer = "X";
let movesCount = 0;
let gameOver = false;
let playerXScore = 0;
let playerOScore = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const title = `
${chalk.cyan.bold(`
████████╗██╗ ██████╗    ████████╗ █████╗  ██████╗    ████████╗ ██████╗ ███████╗
╚══██╔══╝██║██╔════╝    ╚══██╔══╝██╔══██╗██╔════╝    ╚══██╔══╝██╔═══██╗██╔════╝
   ██║   ██║██║            ██║   ███████║██║            ██║   ██║   ██║█████╗  
   ██║   ██║██║            ██║   ██╔══██║██║            ██║   ██║   ██║██╔══╝  
   ██║   ██║╚██████╗       ██║   ██║  ██║╚██████╗       ██║   ╚██████╔╝███████╗
   ╚═╝   ╚═╝ ╚═════╝       ╚═╝   ╚═╝  ╚═╝ ╚═════╝       ╚═╝    ╚═════╝ ╚══════╝
`)}

${chalk.yellow("Welcome to the Ultimate Tic-Tac-Toe Experience!")}
`;

function clearScreen() {
  console.clear();
}

function displayScores() {
  console.log(chalk.green("\nCurrent Scores:"));
  console.log(chalk.blue(`Player X: ${playerXScore}`));
  console.log(chalk.red(`Player O: ${playerOScore}`));
  console.log(chalk.yellow(`Total Games: ${playerXScore + playerOScore}`));
}

function displayBoard() {
  clearScreen();
  console.log(title);
  displayScores();

  console.log(chalk.magenta("\nCurrent Board:"));
  console.log(chalk.cyan("    0   1   2"));
  console.log(chalk.cyan("  ╔═══╦═══╦═══╗"));

  for (let i = 0; i < 3; i++) {
    let row = chalk.cyan(`${i} ║`);
    for (let j = 0; j < 3; j++) {
      const cell = board[i][j];
      const coloredCell =
        cell === "X"
          ? chalk.blue.bold(cell)
          : cell === "O"
          ? chalk.red.bold(cell)
          : " ";
      row += ` ${coloredCell} ║`;
    }
    console.log(row);
    if (i < 2) console.log(chalk.cyan("  ╠═══╬═══╬═══╣"));
  }
  console.log(chalk.cyan("  ╚═══╩═══╩═══╝"));
}

function checkWin() {
  const player = currentPlayer;

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    ) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    ) {
      return true;
    }
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return true;
  }

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return true;
  }

  return false;
}

function makeMove(row, col) {
  board[row][col] = currentPlayer;
  movesCount++;

  displayBoard();

  if (checkWin()) {
    console.log(chalk.green.bold(`\n🎉 Player ${currentPlayer} wins! 🎉`));
    if (currentPlayer === "X") playerXScore++;
    else playerOScore++;
    gameOver = true;
    setTimeout(() => {
      askPlayAgain();
    }, 1000);
    return;
  } else if (movesCount === 9) {
    console.log(chalk.yellow.bold("\n🤝 The game is a draw! 🤝"));
    setTimeout(() => {
      askPlayAgain();
    }, 1000);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  promptMove();
}

function resetGame() {
  board = Array(3)
    .fill()
    .map(() => Array(3).fill(" "));
  currentPlayer = "X";
  movesCount = 0;
  gameOver = false;
}

function askPlayAgain() {
  rl.question(chalk.cyan("\nDo you want to play again? (y/n): "), (answer) => {
    if (answer.toLowerCase() === "y") {
      resetGame();
      displayBoard();
      promptMove();
    } else {
      console.log(chalk.green("\nThanks for playing! Goodbye! 👋"));
      rl.close();
    }
  });
}

function promptMove() {
  if (gameOver) {
    return;
  }

  const playerColor = currentPlayer === "X" ? chalk.blue : chalk.red;
  rl.question(
    playerColor(`\nPlayer ${currentPlayer}, enter your move (row,col): `),
    (input) => {
      const [rowStr, colStr] = input.trim().split(",");
      const row = parseInt(rowStr);
      const col = parseInt(colStr);

      if (
        isNaN(row) ||
        isNaN(col) ||
        row < 0 ||
        row > 2 ||
        col < 0 ||
        col > 2
      ) {
        console.log(
          chalk.red(
            "\n❌ Invalid input! Please enter row,col as numbers between 0-2."
          )
        );
        promptMove();
        return;
      }

      if (board[row][col] !== " ") {
        console.log(chalk.red("\n❌ That cell is already taken! Try again."));
        promptMove();
        return;
      }

      makeMove(row, col);
    }
  );
}

function setupRawMode() {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
}

function startGame() {
  clearScreen();
  console.log(title);
  console.log(chalk.yellow("\nGame Instructions:"));
  console.log(
    chalk.white("1. Enter moves as row,column (e.g., 1,2 for row 1, column 2)")
  );
  console.log(
    chalk.white("2. Rows and columns are 0-indexed (0,0 is top left)")
  );
  console.log(chalk.white("3. Player X goes first, followed by Player O"));
  console.log(chalk.cyan("\nPress any key to start..."));

  // Setup raw mode to capture any keypress
  setupRawMode();

  // Listen for any keypress event
  const keyPressHandler = function (key) {
    // Remove this listener to avoid duplicate handlers
    process.stdin.removeListener("data", keyPressHandler);

    // Return to normal mode
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }

    // Start the game
    displayBoard();
    promptMove();
  };

  // Add the keypress handler
  process.stdin.on("data", keyPressHandler);
}

// Start the game
startGame();
