import { memo } from 'react';
import type { Score } from '../../types/game.types';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  score: Score;
}

export const ScoreBoard = memo(function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className={styles.scoreboard} aria-label="Scoreboard">
      <div className={[styles.card, styles.cardX].join(' ')}>
        <span className={styles.player}>X</span>
        <span className={styles.points}>{score.X}</span>
      </div>
      <div className={[styles.card, styles.cardDraw].join(' ')}>
        <span className={styles.player}>Draws</span>
        <span className={styles.points}>{score.draws}</span>
      </div>
      <div className={[styles.card, styles.cardO].join(' ')}>
        <span className={styles.player}>O</span>
        <span className={styles.points}>{score.O}</span>
      </div>
    </div>
  );
});
