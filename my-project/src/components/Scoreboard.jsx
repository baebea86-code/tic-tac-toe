import { MODES } from '../gameReducer';

/**
 * Scoreboard — displays wins for X, draws, and wins for O.
 *
 * Props:
 *   score – { X: number, O: number, draws: number }
 *   mode  – current game mode (MODES.VS_COMPUTER | MODES.TWO_PLAYER)
 */
export default function Scoreboard({ score, mode }) {
  const xLabel = 'X';
  const oLabel = mode === MODES.VS_COMPUTER ? 'CPU' : 'O';

  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <h2 className="scoreboard__title">Scoreboard</h2>
      <div className="scoreboard__cells">
        <div className="scoreboard__cell scoreboard__cell--x">
          <span className="scoreboard__label">{xLabel}</span>
          <span className="scoreboard__value">{score.X}</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--draw">
          <span className="scoreboard__label">Draws</span>
          <span className="scoreboard__value">{score.draws}</span>
        </div>
        <div className="scoreboard__cell scoreboard__cell--o">
          <span className="scoreboard__label">{oLabel}</span>
          <span className="scoreboard__value">{score.O}</span>
        </div>
      </div>
    </div>
  );
}
