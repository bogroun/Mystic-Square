import React, { useRef, useEffect, useState } from 'react';

// Simple confetti pieces for the animation effect
const Confetti: React.FC = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
                backgroundColor: ['#a78bfa', '#f472b6', '#4ade80', '#60a5fa'][Math.floor(Math.random()*4)]
            };
            return <div key={i} className="confetti" style={style}></div>;
        })}
        <style>{`
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                opacity: 0.7;
            }
            @keyframes fall {
                0% { transform: translateY(-10vh) rotate(0deg); }
                100% { transform: translateY(110vh) rotate(720deg); }
            }
        `}</style>
    </div>
);


interface WinModalProps {
    show: boolean;
    time: number;
    moves: number;
    gridSize: number;
    onClose: () => void;
    onNewGame: () => void;
}

const ActionButton: React.FC<{onClick: () => void, children: React.ReactNode, className?: string}> = ({ onClick, children, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 w-full rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${className}`}
    >
      {children}
    </button>
  );

const WinModal: React.FC<WinModalProps> = ({ show, time, moves, gridSize, onClose, onNewGame }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shareImageUrl, setShareImageUrl] = useState('');

    useEffect(() => {
        if (show && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Standard social share image size (1200x630)
            const scale = 2; // Render at 2x for high-res displays
            canvas.width = 1200 * scale;
            canvas.height = 630 * scale;
            ctx.scale(scale, scale);

            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
            gradient.addColorStop(0, '#f9fafb');
            gradient.addColorStop(1, '#f3f4f6');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1200, 630);
            
            // Main Title
            ctx.fillStyle = '#2563eb'; // text-blue-600
            ctx.font = 'bold 80px Poppins';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 10;
            ctx.fillText('PUZZLE SOLVED!', 600, 140);
            ctx.shadowBlur = 0;

            // Stats
            ctx.fillStyle = '#1f2937'; // text-gray-800
            ctx.font = '60px Poppins';
            ctx.fillText(`Time: ${time}s`, 600, 290);
            ctx.fillText(`Moves: ${moves}`, 600, 380);

            // Puzzle Type
            ctx.font = '40px Poppins';
            ctx.fillStyle = '#4b5563'; // text-gray-600
            ctx.fillText(`${gridSize * gridSize - 1}-Puzzle`, 600, 470);

             // Footer
            ctx.font = 'italic 24px Poppins';
            ctx.fillStyle = '#9ca3af'; // text-gray-400
            ctx.fillText('Mystic Square Puzzle', 600, 580);

            setShareImageUrl(canvas.toDataURL('image/png'));
        }
    }, [show, time, moves, gridSize]);
    
    const handleShare = async () => {
        try {
            const blob = await (await fetch(shareImageUrl)).blob();
            const file = new File([blob], 'mystic-square-solved.png', { type: 'image/png' });
            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'I Solved the Mystic Square!',
                    text: `I solved the ${gridSize*gridSize-1}-puzzle in ${moves} moves and ${time} seconds. Can you beat me?`,
                    files: [file],
                });
            } else {
                alert('Web Share API not supported. Try downloading the image!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            alert('Could not share the image.');
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="win-title">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full text-center border border-gray-200 transform transition-all animate-fade-in-up">
                <Confetti />
                <h2 id="win-title" className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Congratulations!</h2>
                <p className="text-gray-600 mb-6">You solved the puzzle!</p>

                {shareImageUrl && (
                     <div className="mb-6 rounded-lg overflow-hidden border-2 border-gray-300">
                        <img src={shareImageUrl} alt="Puzzle solved summary" className="w-full" />
                     </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <ActionButton onClick={onNewGame} className="bg-blue-500 hover:bg-blue-600 text-white">
                        Play Again
                    </ActionButton>
                    <ActionButton onClick={handleShare} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
                        Share Result
                    </ActionButton>
                    <a 
                        href={shareImageUrl} 
                        download="mystic-square-solved.png"
                        className="px-4 py-2 w-full block rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                       Download
                    </a>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors">&times;</button>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default WinModal;