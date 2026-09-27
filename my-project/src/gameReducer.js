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

/** Returns { winner: 'X'|'O', line: [i,j,k] } or null. */
export function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/** Returns true when every square is filled and there is no winner. */
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

// ─── Game Modes ───────────────────────────────────────────────────────────────

export const MODES = {
  VS_COMPUTER: 'vs-computer',
  TWO_PLAYER:  '2-player',
};

// ─── Initial State ────────────────────────────────────────────────────────────

export const initialState = {
  mode:        MODES.VS_COMPUTER,   // current game mode
  history:     [Array(9).fill(null)],
  stepIndex:   0,
  xIsNext:     true,                // X always opens game 0
  gameCount:   0,                   // increments on each new game; drives who starts
  starterIsX:  true,                // which symbol started the current game
  score:       { X: 0, O: 0, draws: 0 },
};

// ─── Action Types ─────────────────────────────────────────────────────────────

export const ACTIONS = {
  MAKE_MOVE:     'MAKE_MOVE',
  RESET:         'RESET',
  JUMP_TO:       'JUMP_TO',
  SET_MODE:      'SET_MODE',
  RECORD_RESULT: 'RECORD_RESULT',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

export function gameReducer(state, action) {
  switch (action.type) {

    // Switch between vs-computer and 2-player; keeps scoreboard
    case ACTIONS.SET_MODE: {
      const { mode } = action.payload;
      return {
        ...initialState,
        mode,
        score:      state.score,
        gameCount:  state.gameCount,
        starterIsX: state.starterIsX,
        xIsNext:    state.starterIsX,
      };
    }

    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload;
      const currentBoard = state.history[state.stepIndex];

      if (currentBoard[index] || calculateWinner(currentBoard) || isDraw(currentBoard)) {
        return state;
      }

      const nextBoard = currentBoard.slice();
      nextBoard[index] = state.xIsNext ? 'X' : 'O';

      const nextHistory = state.history.slice(0, state.stepIndex + 1);
      nextHistory.push(nextBoard);

      return {
        ...state,
        history:   nextHistory,
        stepIndex: nextHistory.length - 1,
        xIsNext:   !state.xIsNext,
      };
    }

    // Update the scoreboard after a game ends
    case ACTIONS.RECORD_RESULT: {
      const { result } = action.payload; // 'X' | 'O' | 'draw'
      const newScore = { ...state.score };
      if (result === 'X')       newScore.X += 1;
      else if (result === 'O')  newScore.O += 1;
      else                      newScore.draws += 1;
      return { ...state, score: newScore };
    }

    // New game: alternate who starts (even gameCount → X, odd → O)
    case ACTIONS.RESET: {
      const nextCount     = state.gameCount + 1;
      const nextStarterIsX = nextCount % 2 === 0; // game 0→X, 1→O, 2→X …
      return {
        ...state,
        history:     [Array(9).fill(null)],
        stepIndex:   0,
        xIsNext:     nextStarterIsX,
        gameCount:   nextCount,
        starterIsX:  nextStarterIsX,
      };
    }

    case ACTIONS.JUMP_TO: {
      const { step } = action.payload;
      // Re-derive whose turn it is relative to the game's starter
      const starterIsNext = step % 2 === 0;
      const xIsNext = state.starterIsX ? starterIsNext : !starterIsNext;
      return { ...state, stepIndex: step, xIsNext };
    }

    default:
      return state;
  }
}
