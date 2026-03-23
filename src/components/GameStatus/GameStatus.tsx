import { memo } from 'react';
import type { GameResult, Player } from '../../types/game.types';
import styles from './GameStatus.module.css';

interface GameStatusProps {
  currentPlayer: Player;
  result: GameResult;
  onReset: () => void;
  onResetAll: () => void;
}

export const GameStatus = memo(function GameStatus({
  currentPlayer,
  result,
  onReset,
  onResetAll,
}: GameStatusProps) {
  const statusMessage = result.winner
    ? `Player ${result.winner} wins!`
    : result.isDraw
    ? "It's a draw!"
    : `Player ${currentPlayer}'s turn`;

  return (
    <div className={styles.container}>
      <p
        className={[
          styles.status,
          result.winner ? styles[`winner${result.winner}`] : '',
          result.isDraw ? styles.draw : '',
        ].join(' ')}
        aria-live="polite"
      >
        {statusMessage}
      </p>
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onReset}>
          New Game
        </button>
        <button className={styles.btnSecondary} onClick={onResetAll}>
          Reset Scores
        </button>
      </div>
    </div>
  );
});
