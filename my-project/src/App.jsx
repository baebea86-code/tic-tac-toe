import { useReducer, useEffect, useRef } from 'react';
import {
  gameReducer,
  initialState,
  ACTIONS,
  MODES,
  calculateWinner,
  isDraw,
} from './gameReducer';
import { getBestMove } from './ai';
import Board        from './components/Board';
import Status       from './components/Status';
import History      from './components/History';
import ModeSelector from './components/ModeSelector';
import Scoreboard   from './components/Scoreboard';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { history, stepIndex, xIsNext, mode, score, starterIsX } = state;

  const currentBoard = history[stepIndex];
  const winResult    = calculateWinner(currentBoard);
  const draw         = isDraw(currentBoard);
  const gameOver     = !!winResult || draw;

  // In vs-computer mode the human is always X, computer is O
  const isVsComputer  = mode === MODES.VS_COMPUTER;
  const computerSymbol = 'O';
  const isComputerTurn = isVsComputer && !xIsNext && !gameOver;

  // Track whether we've already recorded this game result
  const recordedRef = useRef(false);

  // Record score once per finished game
  useEffect(() => {
    if (!gameOver || recordedRef.current) return;
    recordedRef.current = true;
    const result = winResult ? winResult.winner : 'draw';
    dispatch({ type: ACTIONS.RECORD_RESULT, payload: { result } });
  }, [gameOver, winResult]);

  // Reset the "recorded" flag when a new game starts
  useEffect(() => {
    if (!gameOver) recordedRef.current = false;
  }, [stepIndex, gameOver]);

  // Computer move — fires after state settles when it's the CPU's turn
  useEffect(() => {
    if (!isComputerTurn) return;

    // Small delay so the human's move is visible before the CPU responds
    const id = setTimeout(() => {
      const bestIndex = getBestMove(currentBoard, computerSymbol);
      dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index: bestIndex } });
    }, 350);

    return () => clearTimeout(id);
  }, [isComputerTurn, currentBoard]);

  function handleSquareClick(index) {
    // Block human clicking during the computer's turn
    if (isComputerTurn) return;
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } });
  }

  function handleReset() {
    dispatch({ type: ACTIONS.RESET });
  }

  function handleJumpTo(step) {
    dispatch({ type: ACTIONS.JUMP_TO, payload: { step } });
  }

  function handleModeChange(newMode) {
    dispatch({ type: ACTIONS.SET_MODE, payload: { mode: newMode } });
  }

  // Determine who opens the next game for the hint text
  const nextStarter = state.gameCount % 2 !== 0 ? 'X' : 'O';

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-x">X</span>
          <span className="app__title-sep"> vs </span>
          <span className="app__title-o">O</span>
        </h1>
        <p className="app__subtitle">Tic · Tac · Toe</p>

        {/* Mode selector */}
        <ModeSelector mode={mode} onChange={handleModeChange} />
      </header>

      {/* Scoreboard */}
      <Scoreboard score={score} mode={mode} />

      <main className="app__main">
        <section className="game" aria-label="Game area">
          <Status
            winner={winResult?.winner ?? null}
            isDraw={draw}
            xIsNext={xIsNext}
            mode={mode}
            starterIsX={starterIsX}
          />

          <Board
            squares={currentBoard}
            winningLine={winResult?.line ?? null}
            gameOver={gameOver || isComputerTurn}
            onSquareClick={handleSquareClick}
          />

          <div className="game__actions">
            <button
              className="btn-restart"
              onClick={handleReset}
              aria-label="Start next game"
            >
              🔁 Next Game
            </button>
            {gameOver && (
              <p className="game__starter-hint">
                Next game starts: <strong>{nextStarter}</strong>
              </p>
            )}
          </div>
        </section>

        {/* Move History — Time Travel */}
        <History
          history={history}
          stepIndex={stepIndex}
          onJumpTo={handleJumpTo}
        />
      </main>
    </div>
  );
}
