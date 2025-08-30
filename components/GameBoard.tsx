import React from 'react';
import type { Board } from '../types';
import Tile from './Tile';
import { getTileProximity } from '../utils/puzzle';

interface GameBoardProps {
  board: Board;
  onTileClick: (row: number, col: number) => void;
  isSolved: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onTileClick, isSolved }) => {
  const gridSize = board.length;
  
  const TILE_GAP_PERCENT = 2.5; // Gap between tiles
  const TILE_SIZE_PERCENT = (100 - TILE_GAP_PERCENT * (gridSize + 1)) / gridSize;
  const PADDING_PERCENT = TILE_GAP_PERCENT;

  return (
    <div className="relative w-full p-2 md:p-4 bg-gray-200 rounded-xl shadow-2xl" style={{ aspectRatio: '1 / 1' }}>
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const proximity = getTileProximity(value, rowIndex, colIndex, gridSize);
          const style = {
            top: `${PADDING_PERCENT + rowIndex * (TILE_SIZE_PERCENT + TILE_GAP_PERCENT)}%`,
            left: `${PADDING_PERCENT + colIndex * (TILE_SIZE_PERCENT + TILE_GAP_PERCENT)}%`,
            width: `${TILE_SIZE_PERCENT}%`,
            height: `${TILE_SIZE_PERCENT}%`,
          };
          
          return (
            <Tile
              key={value ?? 'empty'}
              value={value}
              onClick={() => onTileClick(rowIndex, colIndex)}
              proximity={proximity}
              isSolved={isSolved}
              style={style}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;