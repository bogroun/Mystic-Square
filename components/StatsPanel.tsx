
import React, { useState } from 'react';

const ActionButton: React.FC<{onClick: () => void, children: React.ReactNode, className?: string}> = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 w-full rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${className}`}
  >
    {children}
  </button>
);

interface StatsPanelProps {
  time: number;
  moves: number;
  onShuffle: () => void;
  onReset: () => void;
  onShare: () => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ time, moves, onShuffle, onReset, onShare }) => {
  const [shareText, setShareText] = useState('Share this Shuffle');
  
  const handleShareClick = () => {
    onShare();
    setShareText('Copied, Now Paste!');
    setTimeout(() => {
      setShareText('Share this Shuffle');
    }, 2000);
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg mt-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-around items-center text-center mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 uppercase tracking-wider">Time</span>
          <span className="text-3xl font-mono text-gray-800">{time}s</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 uppercase tracking-wider">Moves</span>
          <span className="text-3xl font-mono text-gray-800">{moves}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <ActionButton onClick={onShuffle} className="bg-blue-500 hover:bg-blue-600 text-white">
          New Game
        </ActionButton>
        <ActionButton onClick={onReset} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
          Reset
        </ActionButton>
        <ActionButton onClick={handleShareClick} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
          {shareText}
        </ActionButton>
      </div>
    </div>
  );
};

export default StatsPanel;