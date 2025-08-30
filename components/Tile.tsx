import React from 'react';
import type { TileValue, Proximity } from '../types';

interface TileProps {
  value: TileValue;
  onClick: () => void;
  proximity: Proximity;
  isSolved: boolean;
  style: React.CSSProperties;
}

const Tile: React.FC<TileProps> = ({ value, onClick, proximity, isSolved, style }) => {
  const baseClasses = "absolute flex items-center justify-center font-bold text-3xl md:text-5xl rounded-lg shadow-lg select-none transition-all duration-300 ease-in-out text-white";
  
  let tileClasses = "";

  if (isSolved) {
      tileClasses = "bg-green-400 cursor-default";
  } else {
      switch (proximity) {
        case 'empty':
            tileClasses = "bg-gray-200 cursor-default";
            break;
        case 'correct':
            tileClasses = "bg-green-500 cursor-pointer transform hover:scale-105";
            break;
        case 'close':
            tileClasses = "bg-yellow-400 cursor-pointer transform hover:scale-105";
            break;
        case 'far':
        default:
            tileClasses = "bg-blue-500 hover:bg-blue-400 cursor-pointer transform hover:scale-105";
            break;
      }
  }
  
  return (
    <div
      onClick={proximity === 'empty' || isSolved ? undefined : onClick}
      className={`${baseClasses} ${tileClasses}`}
      style={style}
    >
      {value}
    </div>
  );
};

export default Tile;