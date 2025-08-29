import React from 'react';

// Reusable Lollipop SVG component for the 'Puzzle Pops' ad
const Lollipop: React.FC<{color: string}> = ({color}) => (
    <svg width="30" height="30" viewBox="0 0 100 100" className={`${color} drop-shadow-lg`}>
        <circle cx="50" cy="35" r="30" fill="currentColor"/>
        <rect x="45" y="60" width="10" height="40" rx="5" fill="currentColor"/>
    </svg>
);

// A styled, static ad component for 'Mystic Fuel'
const MysticFuelAd: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-4 border-2 border-indigo-700 text-white text-center shadow-lg">
      <svg width="60" height="60" viewBox="0 0 24 24" className="mb-4 text-purple-400 drop-shadow-lg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21L14.46 11H11L17 3L9.54 13H13L7 21Z"/>
      </svg>
      <h3 className="font-bold text-2xl tracking-wider uppercase" style={{fontFamily: "'Poppins', sans-serif"}}>Mystic Fuel</h3>
      <p className="text-indigo-300 mt-1 font-semibold">High-Protein Energy</p>
      <p className="mt-4 text-sm font-light opacity-80">Power Up Your Puzzle</p>
    </div>
  );
};

// A styled, static ad component for 'Puzzle Pops'
const PuzzlePopsAd: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 to-yellow-300 rounded-lg p-4 border-2 border-pink-300 text-center shadow-lg">
        <div className="flex space-x-2 mb-4">
            <Lollipop color="text-red-500" />
            <Lollipop color="text-green-500" />
            <Lollipop color="text-blue-500" />
        </div>
      <h3 className="font-bold text-2xl tracking-wider text-white uppercase" style={{ fontFamily: "'Poppins', sans-serif", textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Puzzle Pops</h3>
      <p className="text-gray-800 mt-1 font-semibold">No Sugar, All Fun!</p>
      <p className="mt-4 text-sm text-gray-700">A Healthy Treat for Sharp Minds</p>
    </div>
  );
};

const GeneratedAd: React.FC<{ prompt: string; className?: string }> = ({ prompt, className = '' }) => {
  // Determine which ad to display based on keywords in the prompt
  const isMysticFuel = prompt.toLowerCase().includes('mystic fuel');
  const isPuzzlePops = prompt.toLowerCase().includes('puzzle pops');

  return (
    <div className={`w-full h-full ${className}`}>
      {isMysticFuel && <MysticFuelAd />}
      {isPuzzlePops && <PuzzlePopsAd />}
      
      {/* Fallback for any other prompt, though not currently used in the app */}
      {!isMysticFuel && !isPuzzlePops && (
         <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg p-4">
            <div className="text-center text-gray-500">
                <h3 className="font-bold text-gray-400">Ad Placement</h3>
            </div>
         </div>
      )}
    </div>
  );
};

export default GeneratedAd;