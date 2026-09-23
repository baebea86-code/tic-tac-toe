/**
 * History — lists every move and lets the player jump to any past state.
 *
 * Props:
 *   history     – array of board snapshots
 *   stepIndex   – currently viewed step
 *   onJumpTo    – (step: number) => void
 */
export default function History({ history, stepIndex, onJumpTo }) {
  return (
    <div className="history">
      <h2 className="history__title">Move History</h2>
      <ol className="history__list">
        {history.map((_, step) => {
          const isCurrent = step === stepIndex;
          const label = step === 0 ? 'Game start' : `Move #${step}`;

          return (
            <li key={step} className="history__item">
              <button
                className={`history__btn${isCurrent ? ' history__btn--active' : ''}`}
                onClick={() => onJumpTo(step)}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCurrent ? `▶ ${label}` : `Go to ${label}`}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
