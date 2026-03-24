import { useState } from 'react';
import type { Difficulty, GameMode } from './types/game.types';
import { useGame } from './hooks/useGame';
import { ModeSelector } from './components/ModeSelector/ModeSelector';
import { Board } from './components/Board/Board';
import { GameStatus } from './components/GameStatus/GameStatus';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import styles from './App.module.css';

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const { state, playCell, resetGame, resetAll, isAiThinking } = useGame(
    gameMode ?? 'multiplayer',
    difficulty,
  );

  const handleStart = (mode: GameMode, diff: Difficulty) => {
    setGameMode(mode);
    setDifficulty(diff);
    resetAll();
  };

  const handleChangeMode = () => {
    setGameMode(null);
    resetAll();
  };

  if (!gameMode) {
    return <ModeSelector onStart={handleStart} />;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <ScoreBoard score={state.score} mode={gameMode} />
      <Board
        board={state.board}
        winningLine={state.result.winningLine}
        isGameOver={state.isGameOver || isAiThinking}
        onCellClick={playCell}
      />
      <GameStatus
        currentPlayer={state.currentPlayer}
        result={state.result}
        mode={gameMode}
        isAiThinking={isAiThinking}
        onReset={resetGame}
        onResetAll={resetAll}
        onChangeMode={handleChangeMode}
      />
    </main>
  );
}
