import { MODES } from '../gameReducer';

/**
 * ModeSelector — toggle between "vs Computer" and "2 Players".
 *
 * Props:
 *   mode     – current MODES value
 *   onChange – (newMode: string) => void
 */
export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="mode-selector" role="group" aria-label="Game mode">
      <button
        className={`mode-btn${mode === MODES.VS_COMPUTER ? ' mode-btn--active' : ''}`}
        onClick={() => onChange(MODES.VS_COMPUTER)}
        aria-pressed={mode === MODES.VS_COMPUTER}
      >
        vs Computer
      </button>
      <button
        className={`mode-btn${mode === MODES.TWO_PLAYER ? ' mode-btn--active' : ''}`}
        onClick={() => onChange(MODES.TWO_PLAYER)}
        aria-pressed={mode === MODES.TWO_PLAYER}
      >
        2 Players
      </button>
    </div>
  );
}
