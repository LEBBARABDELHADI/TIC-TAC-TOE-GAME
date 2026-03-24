import type { Board, Difficulty } from '../types/game.types';
import { computeGameResult } from './gameUtils';

// ─── Helpers ────────────────────────────────────────────────────────────────

function getEmptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, i) => (cell === null ? [...acc, i] : acc), []);
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Easy: random move ───────────────────────────────────────────────────────

function getRandomMove(board: Board): number {
  const empty = getEmptyCells(board);
  return empty.length > 0 ? randomPick(empty) : -1;
}

// ─── Medium: win > block > random ───────────────────────────────────────────

function findImmediateWin(board: Board, player: 'X' | 'O'): number {
  for (const i of getEmptyCells(board)) {
    const testBoard = [...board] as Board;
    testBoard[i] = player;
    if (computeGameResult(testBoard).winner === player) return i;
  }
  return -1;
}

function getMediumMove(board: Board): number {
  const winMove = findImmediateWin(board, 'O');
  if (winMove !== -1) return winMove;

  const blockMove = findImmediateWin(board, 'X');
  if (blockMove !== -1) return blockMove;

  return getRandomMove(board);
}

// ─── Hard: Minimax ──────────────────────────────────────────────────────────

function minimax(board: Board, isMaximizing: boolean): number {
  const result = computeGameResult(board);
  if (result.winner === 'O') return 10;
  if (result.winner === 'X') return -10;
  if (result.isDraw) return 0;

  const empty = getEmptyCells(board);

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of empty) {
      const next = [...board] as Board;
      next[i] = 'O';
      best = Math.max(best, minimax(next, false));
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empty) {
      const next = [...board] as Board;
      next[i] = 'X';
      best = Math.min(best, minimax(next, true));
    }
    return best;
  }
}

function getHardMove(board: Board): number {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (const i of getEmptyCells(board)) {
    const next = [...board] as Board;
    next[i] = 'O';
    const score = minimax(next, false);
    if (score > bestVal) {
      bestVal = score;
      bestMove = i;
    }
  }
  return bestMove;
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function getAiMove(board: Board, difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':   return getRandomMove(board);
    case 'medium': return getMediumMove(board);
    case 'hard':   return getHardMove(board);
  }
}
