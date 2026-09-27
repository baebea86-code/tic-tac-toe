import { MODES } from '../gameReducer';

/**
 * Status — shows the current game state to the player.
 *
 * Props:
 *   winner   – 'X' | 'O' | null
 *   isDraw   – boolean
 *   xIsNext  – boolean
 *   mode     – MODES value
 *   starterIsX – boolean (who started this game, shown in turn indicator)
 */
export default function Status({ winner, isDraw, xIsNext, mode, starterIsX }) {
  const isVsComputer = mode === MODES.VS_COMPUTER;

  // In vs-computer mode: human is always X, CPU is O
  function playerLabel(symbol) {
    if (!isVsComputer) return symbol;
    return symbol === 'X' ? 'You (X)' : 'CPU (O)';
  }

  let message;
  let modifier = '';

  if (winner) {
    message  = `🏆 ${playerLabel(winner)} wins!`;
    modifier = `status--winner status--${winner.toLowerCase()}`;
  } else if (isDraw) {
    message  = "🤝 It's a Draw!";
    modifier = 'status--draw';
  } else {
    const next = xIsNext ? 'X' : 'O';
    message  = `${playerLabel(next)}'s turn`;
    modifier = `status--next status--${xIsNext ? 'x' : 'o'}`;
  }

  return (
    <p className={`status ${modifier}`} role="status" aria-live="polite">
      {message}
    </p>
  );
}
