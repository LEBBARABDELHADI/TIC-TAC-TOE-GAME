export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type Board = [
  CellValue, CellValue, CellValue,
  CellValue, CellValue, CellValue,
  CellValue, CellValue, CellValue,
];

export type WinningLine = [number, number, number];

export interface GameResult {
  winner: Player | null;
  winningLine: WinningLine | null;
  isDraw: boolean;
}

export interface Score {
  X: number;
  O: number;
  draws: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  result: GameResult;
  isGameOver: boolean;
  score: Score;
}
