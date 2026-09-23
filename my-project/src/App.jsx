import { useReducer } from 'react';
import { gameReducer, initialState, ACTIONS, calculateWinner, isDraw } from './gameReducer';
import Board from './components/Board';
import Status from './components/Status';
import History from './components/History';
import './App.css';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const { history, stepIndex, xIsNext } = state;
  const currentBoard = history[stepIndex];
  const winResult = calculateWinner(currentBoard);
  const draw = isDraw(currentBoard);
  const gameOver = !!winResult || draw;

  function handleSquareClick(index) {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: { index } });
  }

  function handleReset() {
    dispatch({ type: ACTIONS.RESET });
  }

  function handleJumpTo(step) {
    dispatch({ type: ACTIONS.JUMP_TO, payload: { step } });
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span className="app__title-x">X</span>
          <span className="app__title-sep"> vs </span>
          <span className="app__title-o">O</span>
        </h1>
        <p className="app__subtitle">TicTacToe</p>
      </header>

      <main className="app__main">
        <section className="game" aria-label="Game area">
          <Status
            winner={winResult?.winner ?? null}
            isDraw={draw}
            xIsNext={xIsNext}
          />

          <Board
            squares={currentBoard}
            winningLine={winResult?.line ?? null}
            gameOver={gameOver}
            onSquareClick={handleSquareClick}
          />

          {/* Manual Feature: Restart Button */}
          <button className="btn-restart" onClick={handleReset} aria-label="Restart game">
            🔁 Restart
          </button>
        </section>

        {/* Advanced Feature: Move History + Time Travel */}
        <History
          history={history}
          stepIndex={stepIndex}
          onJumpTo={handleJumpTo}
        />
      </main>
    </div>
  );
}
