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
  const baseClasses = "absolute flex items-center justify-center font-bold text-3xl md:text-5xl rounded-lg shadow-lg select-none transition-all duration-300 ease-in-out";
  
  let tileClasses = "";

  if (isSolved) {
      tileClasses = "bg-green-500/80 text-white cursor-default";
  } else {
      switch (proximity) {
        case 'empty':
            tileClasses = "bg-gray-800 cursor-default";
            break;
        case 'correct':
            tileClasses = "bg-green-600 text-white cursor-pointer transform hover:scale-105";
            break;
        case 'close':
            tileClasses = "bg-orange-500 text-white cursor-pointer transform hover:scale-105";
            break;
        case 'far':
        default:
            tileClasses = "bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer transform hover:scale-105";
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
