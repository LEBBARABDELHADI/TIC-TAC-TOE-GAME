import { memo } from 'react';
import type { CellValue } from '../../types/game.types';
import styles from './Cell.module.css';

interface CellProps {
  value: CellValue;
  index: number;
  isWinning: boolean;
  isDisabled: boolean;
  onClick: (index: number) => void;
}

export const Cell = memo(function Cell({ value, index, isWinning, isDisabled, onClick }: CellProps) {
  const handleClick = () => {
    if (!isDisabled && !value) onClick(index);
  };

  return (
    <button
      className={[
        styles.cell,
        value ? styles[value.toLowerCase()] : '',
        isWinning ? styles.winning : '',
      ].join(' ')}
      onClick={handleClick}
      disabled={isDisabled || !!value}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      <span className={styles.symbol}>{value}</span>
    </button>
  );
});
