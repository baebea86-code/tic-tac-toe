import Square from './Square';

/**
 * Board — renders the 3×3 grid.
 *
 * Props:
 *   squares     – array of 9 values ('X' | 'O' | null)
 *   winningLine – array of 3 indices that form the winning combo, or null
 *   gameOver    – boolean, disables all squares when true
 *   onSquareClick – (index: number) => void
 */
export default function Board({ squares, winningLine, gameOver, onSquareClick }) {
  return (
    <div className="board" role="grid" aria-label="TicTacToe board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          isWinning={winningLine?.includes(i) ?? false}
          disabled={gameOver}
        />
      ))}
    </div>
  );
}
