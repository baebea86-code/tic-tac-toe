/**
 * Status — shows the current game state to the player.
 *
 * Props:
 *   winner  – 'X' | 'O' | null
 *   isDraw  – boolean
 *   xIsNext – boolean
 */
export default function Status({ winner, isDraw, xIsNext }) {
  let message;
  let modifier = '';

  if (winner) {
    message = `Winner: ${winner}`;
    modifier = `status--winner status--${winner.toLowerCase()}`;
  } else if (isDraw) {
    message = "It's a Draw!";
    modifier = 'status--draw';
  } else {
    message = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    modifier = `status--next status--${xIsNext ? 'x' : 'o'}`;
  }

  return (
    <p className={`status ${modifier}`} role="status" aria-live="polite">
      {message}
    </p>
  );
}
