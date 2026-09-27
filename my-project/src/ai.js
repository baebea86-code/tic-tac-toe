/**
 * ai.js — Minimax-based computer opponent for Tic-Tac-Toe.
 *
 * The computer always plays optimally (never loses).
 * `computerSymbol` is the mark the AI is playing ('X' or 'O').
 * `humanSymbol`    is the human's mark.
 */

import { calculateWinner } from './gameReducer';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEmptyIndices(squares) {
  return squares.reduce((acc, val, i) => {
    if (!val) acc.push(i);
    return acc;
  }, []);
}

// ─── Minimax ──────────────────────────────────────────────────────────────────

/**
 * Returns a score for the given board state from the AI's perspective.
 *   +10 = AI wins, -10 = human wins, 0 = draw
 * `depth` is subtracted/added so the AI prefers faster wins and slower losses.
 */
function minimax(squares, depth, isMaximising, aiSymbol, humanSymbol) {
  const result = calculateWinner(squares);

  if (result) {
    return result.winner === aiSymbol ? 10 - depth : depth - 10;
  }
  if (squares.every(Boolean)) return 0; // draw

  const empty = getEmptyIndices(squares);

  if (isMaximising) {
    let best = -Infinity;
    for (const i of empty) {
      const next = squares.slice();
      next[i] = aiSymbol;
      best = Math.max(best, minimax(next, depth + 1, false, aiSymbol, humanSymbol));
    }
    return best;
  } else {
    let best = +Infinity;
    for (const i of empty) {
      const next = squares.slice();
      next[i] = humanSymbol;
      best = Math.min(best, minimax(next, depth + 1, true, aiSymbol, humanSymbol));
    }
    return best;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the best square index for the computer to play.
 *
 * @param {(string|null)[]} squares   - current 9-cell board
 * @param {string}          aiSymbol  - 'X' or 'O' (the computer's mark)
 * @returns {number}                  - index 0-8 of the best move
 */
export function getBestMove(squares, aiSymbol) {
  const humanSymbol = aiSymbol === 'X' ? 'O' : 'X';
  const empty = getEmptyIndices(squares);

  // Only one cell left — no need to search
  if (empty.length === 1) return empty[0];

  let bestScore = -Infinity;
  let bestMove  = empty[0];

  for (const i of empty) {
    const next = squares.slice();
    next[i] = aiSymbol;
    const score = minimax(next, 0, false, aiSymbol, humanSymbol);
    if (score > bestScore) {
      bestScore = score;
      bestMove  = i;
    }
  }

  return bestMove;
}
