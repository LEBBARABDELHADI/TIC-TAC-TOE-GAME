import { useCallback, useEffect, useState } from 'react';
import type { Board, Difficulty, GameMode, GameState, Player, Score } from '../types/game.types';
import { computeGameResult, createEmptyBoard } from '../utils/gameUtils';
import { getAiMove } from '../utils/aiUtils';

const INITIAL_SCORE: Score = { X: 0, O: 0, draws: 0 };

function createInitialState(score: Score = INITIAL_SCORE): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: 'X',
    result: { winner: null, winningLine: null, isDraw: false },
    isGameOver: false,
    score,
  };
}

export function useGame(mode: GameMode, difficulty: Difficulty) {
  const [state, setState] = useState<GameState>(createInitialState());
  const [isAiThinking, setIsAiThinking] = useState(false);

  const playCell = useCallback((index: number) => {
    setState((prev) => {
      if (prev.isGameOver || prev.board[index] !== null) return prev;

      const newBoard: Board = [...prev.board] as Board;
      newBoard[index] = prev.currentPlayer;

      const result = computeGameResult(newBoard);
      const isGameOver = result.winner !== null || result.isDraw;

      const newScore: Score = { ...prev.score };
      if (result.winner) newScore[result.winner as Player] += 1;
      else if (result.isDraw) newScore.draws += 1;

      return {
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        result,
        isGameOver,
        score: newScore,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setIsAiThinking(false);
    setState((prev) => createInitialState(prev.score));
  }, []);

  const resetAll = useCallback(() => {
    setIsAiThinking(false);
    setState(createInitialState());
  }, []);

  // AI move trigger
  useEffect(() => {
    if (mode !== 'vs-machine' || state.isGameOver || state.currentPlayer !== 'O') {
      return;
    }

    setIsAiThinking(true);
    const timer = setTimeout(() => {
      const idx = getAiMove(state.board, difficulty);
      if (idx !== -1) playCell(idx);
      setIsAiThinking(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, difficulty, state.currentPlayer, state.isGameOver]);

  return { state, playCell, resetGame, resetAll, isAiThinking };
}
