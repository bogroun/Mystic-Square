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


const TermsOfUse: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <PageContainer title="Terms of Use" onBack={onBack}>
        <p>By accessing and using the Mystic Square game, you agree to comply with and be bound by the following terms and conditions of use.</p>
        <h2 className="text-xl font-bold mt-4">Use of the Game</h2>
        <p>This game is provided for your personal, non-commercial use. You agree not to use the game for any unlawful purpose or in any way that might harm, disrupt, or impair the service.</p>
        <h2 className="text-xl font-bold mt-4">Disclaimer of Warranty</h2>
        <p>The game is provided "as is" without any warranties of any kind. We do not guarantee that the game will always be safe, secure, or error-free, or that it will always function without disruptions, delays, or imperfections.</p>
        <h2 className="text-xl font-bold mt-4">Limitation of Liability</h2>
        <p>We are not liable for any damages or losses arising from your use of or inability to use the game. This includes direct, indirect, incidental, and consequential damages.</p>
    </PageContainer>
  );
};

export default TermsOfUse;