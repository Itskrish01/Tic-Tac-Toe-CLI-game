# CLI Tic-Tac-Toe

A beautiful, colorful command-line implementation of the classic Tic-Tac-Toe game built with Node.js.

![Tic-Tac-Toe](https://i.imgur.com/25PckaC.png)

## Features

- 🎨 **Colorful Interface**: Vibrant, easy-to-read game board with colored symbols
- 📊 **Score Tracking**: Keeps score across multiple games
- 🎮 **Simple Controls**: Intuitive coordinate-based move entry system
- 🔄 **Play Again**: Option to start a new game after completion
- 💎 **Beautiful ASCII Art**: Enjoy a stylish game title and board

## Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed
2. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## How to Play

1. Run the game:
   ```bash
   node index.js
   ```
2. The game board is a 3x3 grid with coordinates (row, column):

   ```
      0   1   2
   ╔═══╦═══╦═══╗
   0 ║   ║   ║   ║
    ╠═══╬═══╬═══╣
   1 ║   ║   ║   ║
    ╠═══╬═══╬═══╣
   2 ║   ║   ║   ║
    ╚═══╩═══╩═══╝
   ```

3. Enter your move as "row,column" (without quotes):

   - For example, to place your mark in the center, type `1,1`
   - To place your mark in the top-right corner, type `0,2`

4. Players take turns (X goes first, then O)
5. The first player to get three marks in a row (horizontally, vertically, or diagonally) wins!
6. If the board fills up with no winner, the game is a draw

## Technical Details

- Built with Node.js
- Uses the chalk package for terminal colors
- Uses the readline package for user input
- ES Modules syntax for modern JavaScript

## License

MIT

## Credits

- Created by itsKrish01
- ASCII art generated with [Text to ASCII Art Generator](https://patorjk.com/software/taag/)
