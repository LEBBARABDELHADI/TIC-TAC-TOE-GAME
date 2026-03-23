import { memo } from 'react';
import { Cell } from '../Cell/Cell';
import type { Board as BoardType, WinningLine } from '../../types/game.types';
import styles from './Board.module.css';

interface BoardProps {
  board: BoardType;
  winningLine: WinningLine | null;
  isGameOver: boolean;
  onCellClick: (index: number) => void;
}

export const Board = memo(function Board({ board, winningLine, isGameOver, onCellClick }: BoardProps) {
  return (
    <div className={styles.board} role="grid" aria-label="Tic Tac Toe board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          index={index}
          isWinning={winningLine?.includes(index) ?? false}
          isDisabled={isGameOver}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
});
