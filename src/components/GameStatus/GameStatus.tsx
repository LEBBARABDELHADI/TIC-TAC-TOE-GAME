import { memo } from 'react';
import type { GameMode, GameResult, Player } from '../../types/game.types';
import styles from './GameStatus.module.css';

interface GameStatusProps {
  currentPlayer: Player;
  result: GameResult;
  mode: GameMode;
  isAiThinking: boolean;
  onReset: () => void;
  onResetAll: () => void;
  onChangeMode: () => void;
}

export const GameStatus = memo(function GameStatus({
  currentPlayer,
  result,
  mode,
  isAiThinking,
  onReset,
  onResetAll,
  onChangeMode,
}: GameStatusProps) {
  let statusMessage: string;

  if (result.winner) {
    statusMessage = mode === 'vs-machine'
      ? (result.winner === 'X' ? 'Vous gagnez !' : "L'IA gagne !")
      : `Joueur ${result.winner} gagne !`;
  } else if (result.isDraw) {
    statusMessage = 'Égalité !';
  } else if (isAiThinking) {
    statusMessage = "L'IA réfléchit...";
  } else {
    statusMessage = mode === 'vs-machine'
      ? (currentPlayer === 'X' ? 'Votre tour' : "Tour de l'IA")
      : `Tour du joueur ${currentPlayer}`;
  }

  return (
    <div className={styles.container}>
      <p
        className={[
          styles.status,
          result.winner === 'X' ? styles.winnerX : '',
          result.winner === 'O' ? styles.winnerO : '',
          result.isDraw ? styles.draw : '',
        ].join(' ')}
        aria-live="polite"
      >
        {statusMessage}
      </p>
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={onReset}>
          Nouvelle partie
        </button>
        <button className={styles.btnSecondary} onClick={onResetAll}>
          Reset scores
        </button>
        <button className={styles.btnSecondary} onClick={onChangeMode}>
          Changer de mode
        </button>
      </div>
    </div>
  );
});
