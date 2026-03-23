import type { Board, CellValue, GameResult, Player, WinningLine } from '../types/game.types';

const WINNING_LINES: WinningLine[] = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

export function checkWinner(board: Board): { winner: Player; line: WinningLine } | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const cell = board[a];
    if (cell && cell === board[b] && cell === board[c]) {
      return { winner: cell as Player, line };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell: CellValue) => cell !== null);
}

export function computeGameResult(board: Board): GameResult {
  const winnerInfo = checkWinner(board);
  if (winnerInfo) {
    return { winner: winnerInfo.winner, winningLine: winnerInfo.line, isDraw: false };
  }
  if (isBoardFull(board)) {
    return { winner: null, winningLine: null, isDraw: true };
  }
  return { winner: null, winningLine: null, isDraw: false };
}

export function createEmptyBoard(): Board {
  return [null, null, null, null, null, null, null, null, null];
}
