import { useState } from 'react';
import type { Difficulty, GameMode } from '../../types/game.types';
import styles from './ModeSelector.module.css';

interface ModeSelectorProps {
  onStart: (mode: GameMode, difficulty: Difficulty) => void;
}

const DIFFICULTIES: { value: Difficulty; label: string; desc: string }[] = [
  { value: 'easy',   label: 'Facile',  desc: 'Coups aléatoires' },
  { value: 'medium', label: 'Moyen',   desc: 'Stratégie basique' },
  { value: 'hard',   label: 'Difficile', desc: 'Imbattable' },
];

export function ModeSelector({ onStart }: ModeSelectorProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [showDifficulty, setShowDifficulty] = useState(false);

  const handleMultiplayer = () => onStart('multiplayer', 'medium');

  const handleVsMachine = () => setShowDifficulty(true);

  const handleDifficulty = (d: Difficulty) => {
    setSelectedDifficulty(d);
    onStart('vs-machine', d);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <p className={styles.subtitle}>Choisissez votre mode de jeu</p>

      {!showDifficulty ? (
        <div className={styles.modes}>
          <button className={styles.modeCard} onClick={handleMultiplayer}>
            <span className={styles.icon}>👥</span>
            <span className={styles.modeName}>2 Joueurs</span>
            <span className={styles.modeDesc}>Jouez avec un ami</span>
          </button>
          <button className={styles.modeCard} onClick={handleVsMachine}>
            <span className={styles.icon}>🤖</span>
            <span className={styles.modeName}>vs Ordinateur</span>
            <span className={styles.modeDesc}>Affrontez l'IA</span>
          </button>
        </div>
      ) : (
        <div className={styles.difficultySection}>
          <p className={styles.difficultyTitle}>Choisissez la difficulté</p>
          <div className={styles.difficulties}>
            {DIFFICULTIES.map(({ value, label, desc }) => (
              <button
                key={value}
                className={[
                  styles.diffCard,
                  selectedDifficulty === value ? styles.selected : '',
                ].join(' ')}
                onClick={() => handleDifficulty(value)}
              >
                <span className={styles.diffLabel}>{label}</span>
                <span className={styles.diffDesc}>{desc}</span>
              </button>
            ))}
          </div>
          <button className={styles.back} onClick={() => setShowDifficulty(false)}>
            ← Retour
          </button>
        </div>
      )}
    </div>
  );
}
