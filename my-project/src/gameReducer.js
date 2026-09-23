// ─── Win Detection ────────────────────────────────────────────────────────────

const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal
  [2, 4, 6], // anti-diagonal
];

/**
 * Returns { winner: 'X'|'O', line: [i,j,k] } or null.
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * Returns true when every square is filled and there is no winner.
 */
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

// ─── Initial State ────────────────────────────────────────────────────────────

export const initialState = {
  // history is an array of board snapshots; index 0 = empty board
  history: [Array(9).fill(null)],
  // which snapshot in history we are currently viewing
  stepIndex: 0,
  // 'X' always goes first
  xIsNext: true,
};

// ─── Action Types ─────────────────────────────────────────────────────────────

export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET: 'RESET',
  JUMP_TO: 'JUMP_TO',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      const currentBoard = state.history[state.stepIndex];

      // Ignore click if cell is already filled or game is over
      if (currentBoard[index] || calculateWinner(currentBoard) || isDraw(currentBoard)) {
        return state;
      }

      // Build the new board
      const nextBoard = currentBoard.slice();
      nextBoard[index] = state.xIsNext ? 'X' : 'O';

      // Trim any "future" history if we jumped back, then append
      const nextHistory = state.history.slice(0, state.stepIndex + 1);
      nextHistory.push(nextBoard);

      return {
        history: nextHistory,
        stepIndex: nextHistory.length - 1,
        xIsNext: !state.xIsNext,
      };
    }

    case ACTIONS.RESET: {
      return { ...initialState, history: [Array(9).fill(null)] };
    }

    case ACTIONS.JUMP_TO: {
      const { step } = action.payload;
      return {
        ...state,
        stepIndex: step,
        // X goes first (step 0), alternates from there
        xIsNext: step % 2 === 0,
      };
    }

    default:
      return state;
  }
}
