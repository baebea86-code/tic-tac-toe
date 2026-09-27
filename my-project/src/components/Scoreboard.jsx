import { useRef, useEffect } from 'react';
import { MODES } from '../gameReducer';

/**
 * AnimatedValue — flashes when the number changes.
 */
function AnimatedValue({ value }) {
  const ref = useRef(null);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value && ref.current) {
      ref.current.classList.remove('score-pop');
      // Force reflow to restart the animation
      void ref.current.offsetWidth;
      ref.current.classList.add('score-pop');
    }
    prevRef.current = value;
  }, [value]);

  return (
    <span className="scoreboard__value" ref={ref}>
      {value}
    </span>
  );
}

/**
 * Scoreboard — displays wins for X, draws, and wins for O.
 *
 * Props:
 *   score         – { X: number, O: number, draws: number }
 *   mode          – current game mode (MODES.VS_COMPUTER | MODES.TWO_PLAYER)
 *   onResetScores – () => void
 */
export default function Scoreboard({ score, mode, onResetScores }) {
  const xLabel = 'X';
  const oLabel = mode === MODES.VS_COMPUTER ? 'CPU' : 'O';

  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="scoreboard__header">
        <h2 className="scoreboard__title">Scoreboard</h2>
        <button
          className="scoreboard__reset"
          onClick={onResetScores}
          aria-label="Reset scores"
          title="Reset scores"
        >
          ✕ Reset
        </button>
      </div>
      <div className="scoreboard__cells">
        <div className="scoreboard__cell scoreboard__cell--x">
          <span className="scoreboard__label">{xLabel}</span>
          <AnimatedValue value={score.X} />
        </div>
        <div className="scoreboard__cell scoreboard__cell--draw">
          <span className="scoreboard__label">Draws</span>
          <AnimatedValue value={score.draws} />
        </div>
        <div className="scoreboard__cell scoreboard__cell--o">
          <span className="scoreboard__label">{oLabel}</span>
          <AnimatedValue value={score.O} />
        </div>
      </div>
      <p className="scoreboard__games-played">
        {score.X + score.O + score.draws} game{score.X + score.O + score.draws !== 1 ? 's' : ''} played
      </p>
    </div>
  );
}
