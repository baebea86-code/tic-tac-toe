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

  // Allow keyboard users to trigger with Enter or Space
  function handleKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !value) {
      e.preventDefault();
      onClick();
    }
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || !!value}
      aria-label={
        value
          ? `Square filled with ${value}${isWinning ? ', winning square' : ''}`
          : 'Empty square'
      }
    >
      {value}
    </button>
  );
}
