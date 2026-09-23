/**
 * Square — a single cell on the TicTacToe board.
 *
 * Props:
 *   value       – 'X' | 'O' | null
 *   onClick     – called when the square is clicked
 *   isWinning   – boolean, highlights squares that form the winning line
 *   disabled    – boolean, prevents interaction after game ends
 */
export default function Square({ value, onClick, isWinning, disabled }) {
  const classes = [
    'square',
    value === 'X' ? 'square--x' : value === 'O' ? 'square--o' : '',
    isWinning ? 'square--winning' : '',
    !value && !disabled ? 'square--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={value ? `Square filled with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}
