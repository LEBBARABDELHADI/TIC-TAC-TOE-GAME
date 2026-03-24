import { memo } from 'react';
import type { GameMode, Score } from '../../types/game.types';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  score: Score;
  mode: GameMode;
}

export const ScoreBoard = memo(function ScoreBoard({ score, mode }: ScoreBoardProps) {
  const labelX = mode === 'vs-machine' ? 'Vous' : 'X';
  const labelO = mode === 'vs-machine' ? 'IA' : 'O';

  return (
    <div className={styles.scoreboard} aria-label="Scoreboard">
      <div className={[styles.card, styles.cardX].join(' ')}>
        <span className={styles.player}>{labelX}</span>
        <span className={styles.points}>{score.X}</span>
      </div>
      <div className={[styles.card, styles.cardDraw].join(' ')}>
        <span className={styles.player}>Égalités</span>
        <span className={styles.points}>{score.draws}</span>
      </div>
      <div className={[styles.card, styles.cardO].join(' ')}>
        <span className={styles.player}>{labelO}</span>
        <span className={styles.points}>{score.O}</span>
      </div>
    </div>
  );
});
