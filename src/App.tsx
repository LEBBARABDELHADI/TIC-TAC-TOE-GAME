import { useGame } from './hooks/useGame';
import { Board } from './components/Board/Board';
import { GameStatus } from './components/GameStatus/GameStatus';
import { ScoreBoard } from './components/ScoreBoard/ScoreBoard';
import styles from './App.module.css';

export default function App() {
  const { state, playCell, resetGame, resetAll } = useGame();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      <ScoreBoard score={state.score} />
      <Board
        board={state.board}
        winningLine={state.result.winningLine}
        isGameOver={state.isGameOver}
        onCellClick={playCell}
      />
      <GameStatus
        currentPlayer={state.currentPlayer}
        result={state.result}
        onReset={resetGame}
        onResetAll={resetAll}
      />
    </main>
  );
}
