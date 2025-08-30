import React from 'react';

const PageContainer: React.FC<{title: string, onBack: () => void, children: React.ReactNode}> = ({ title, onBack, children }) => (
    <div className="w-full max-w-3xl text-left p-6 md:p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{title}</h1>
        <div className="prose prose-lg text-gray-700">
            {children}
        </div>
        <button 
            onClick={onBack}
            className="mt-8 px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
        >
            &larr; Back to Game
        </button>
    </div>
);


const About: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <PageContainer title="About Mystic Square" onBack={onBack}>
      <p>
        Welcome to Mystic Square, a modern and fluid digital version of the classic sliding puzzle. This game, also known as the 15-puzzle or Gem Puzzle, has challenged and delighted people for over a century.
      </p>
      <p>
        Our goal was to create a sleek, responsive, and enjoyable experience for puzzle enthusiasts of all levels. Maneuver the tiles with your keyboard or by clicking, and aim to solve the puzzle in the fewest moves and the shortest time.
      </p>
      <p>
        The game features multiple difficulty levels (8, 15, and 24-puzzles), dynamic tile coloring to guide your progress, and the ability to share specific shuffles with friends. Push your problem-solving skills to the limit and have fun!
      </p>
    </PageContainer>
  );
};

export default About;