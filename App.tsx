
import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import StatsPanel from './components/StatsPanel';
import GeneratedAd from './components/GeneratedAd';
import Footer from './components/Footer';
import WinModal from './components/WinModal';
import About from './pages/About';
import TermsOfUse from './pages/Terms';
import PrivacyPolicy from './pages/Privacy';
import type { Board, Page } from './types';
import { 
  createSolvedBoard, 
  shuffleBoard, 
  isSolved, 
  findTilePos, 
  EMPTY_TILE_VALUE,
  serializeBoard,
  deserializeBoard
} from './utils/puzzle';
import { initializeAudio, playTileMoveSound } from './utils/sound';

const GameModeSelector: React.FC<{
  currentSize: number;
  onSelectSize: (size: number) => void;
}> = ({ currentSize, onSelectSize }) => {
  const modes = [
    { size: 3, name: '8-Puzzle' },
    { size: 4, name: '15-Puzzle' },
    { size: 5, name: '24-Puzzle' },
  ];

  return (
    <div className="flex justify-center space-x-2 my-4">
      {modes.map(({ size, name }) => (
        <button
          key={size}
          onClick={() => onSelectSize(size)}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 ${
            currentSize === size
              ? 'bg-blue-500 text-white ring-blue-400'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

const GameView: React.FC<{
    gridSize: number;
    onGridSizeChange: (size: number) => void;
}> = ({ gridSize, onGridSizeChange }) => {
  const [board, setBoard] = useState<Board>(() => createSolvedBoard(gridSize));
  const [initialBoard, setInitialBoard] = useState<Board>(board);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const newGame = useCallback((size: number) => {
    onGridSizeChange(size);
    const solvedBoard = createSolvedBoard(size);
    const shuffled = shuffleBoard(solvedBoard);
    setBoard(shuffled);
    setInitialBoard(shuffled);
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    const isInitiallySolved = isSolved(shuffled);
    setSolved(isInitiallySolved);
    setShowWinModal(isInitiallySolved);
    window.location.hash = '';
  }, [onGridSizeChange]);
  
  useEffect(() => {
    // Initialize audio context on the first user interaction
    const initAudio = () => {
        initializeAudio();
        window.removeEventListener('click', initAudio);
        window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);

    return () => {
        window.removeEventListener('click', initAudio);
        window.removeEventListener('keydown', initAudio);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const boardFromHash = deserializeBoard(hash);
    let currentBoard;
    if (boardFromHash) {
        onGridSizeChange(boardFromHash.length);
        currentBoard = boardFromHash;
    } else {
        currentBoard = shuffleBoard(createSolvedBoard(gridSize));
    }
    setBoard(currentBoard);
    setInitialBoard(currentBoard);
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    const isInitiallySolved = isSolved(currentBoard);
    setSolved(isInitiallySolved);
    setShowWinModal(isInitiallySolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize]);
  
  // Fix: Replaced `NodeJS.Timeout` with a browser-compatible inferred type for the timer ID.
  // This also prevents a runtime error by ensuring `clearInterval` is only called if a timer was set.
  useEffect(() => {
    if (isGameStarted && !solved) {
      const timerId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isGameStarted, solved]);

  const handleTileMove = useCallback((newBoard: Board) => {
    if (solved) return;
    playTileMoveSound();

    if (!isGameStarted) setIsGameStarted(true);
    
    setBoard(newBoard);
    setMoves(prev => prev + 1);
    if (isSolved(newBoard)) {
      setSolved(true);
      setIsGameStarted(false);
      setShowWinModal(true);
    }
  }, [isGameStarted, solved]);

  const moveTile = useCallback((row: number, col: number) => {
    const emptyPos = findTilePos(board, EMPTY_TILE_VALUE);
    if (!emptyPos) return;

    const { row: emptyRow, col: emptyCol } = emptyPos;
    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if (isAdjacent) {
      const newBoard = board.map(r => [...r]);
      [newBoard[row][col], newBoard[emptyRow][emptyCol]] = [newBoard[emptyRow][emptyCol], newBoard[row][col]];
      handleTileMove(newBoard);
    }
  }, [board, handleTileMove]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (solved && !showWinModal) return;
    if (showWinModal) return;

    const emptyPos = findTilePos(board, EMPTY_TILE_VALUE);
    if (!emptyPos) return;
    
    const { row, col } = emptyPos;

    let targetRow = row, targetCol = col;
    
    switch (e.key) {
      case 'ArrowUp': if (row < gridSize - 1) targetRow = row + 1; break;
      case 'ArrowDown': if (row > 0) targetRow = row - 1; break;
      case 'ArrowLeft': if (col < gridSize - 1) targetCol = col + 1; break;
      case 'ArrowRight': if (col > 0) targetCol = col - 1; break;
      default: return;
    }
    
    if (targetRow !== row || targetCol !== col) {
        e.preventDefault();
        moveTile(targetRow, targetCol);
    }
  }, [board, moveTile, solved, showWinModal, gridSize]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleReset = () => {
    setBoard(initialBoard);
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    setSolved(isSolved(initialBoard));
    setShowWinModal(false);
  };
  
  const handleShare = () => {
    const boardString = serializeBoard(initialBoard);
    const url = new URL(window.location.href);
    url.hash = boardString;
    navigator.clipboard.writeText(url.toString());
  };

  const handleNewGameFromModal = () => {
      setShowWinModal(false);
      newGame(gridSize);
  }
    
  return (
    <>
    <div className="relative w-full max-w-md lg:max-w-lg flex flex-col items-center">
        <div className="text-center mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Mystic Square</h1>
            <p className="text-gray-600">The Sliding Puzzle Challenge</p>
        </div>
        
        <GameModeSelector currentSize={gridSize} onSelectSize={newGame} />

        <GameBoard board={board} onTileClick={moveTile} isSolved={solved} />

        <StatsPanel
          time={time}
          moves={moves}
          onShuffle={() => newGame(gridSize)}
          onReset={handleReset}
          onShare={handleShare}
        />
    </div>
    <WinModal 
        show={showWinModal}
        time={time}
        moves={moves}
        gridSize={gridSize}
        onClose={() => setShowWinModal(false)}
        onNewGame={handleNewGameFromModal}
    />
    </>
  );
};


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('game');
    const [gridSize, setGridSize] = useState(3);

    const renderPage = () => {
        switch (currentPage) {
            case 'about': return <About onBack={() => setCurrentPage('game')} />;
            case 'terms': return <TermsOfUse onBack={() => setCurrentPage('game')} />;
            case 'privacy': return <PrivacyPolicy onBack={() => setCurrentPage('game')} />;
            case 'game':
            default: return <GameView gridSize={gridSize} onGridSizeChange={setGridSize} />;
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-between p-4 bg-gray-100 font-sans">
            <div className="w-full flex-grow flex items-center justify-center">
                <div className="w-full max-w-7xl flex flex-row items-start justify-center gap-8">
                    <aside className="hidden xl:block w-48 flex-shrink-0">
                        <GeneratedAd 
                            prompt="Professional product photography advertisement for 'Mystic Fuel', a high-protein energy drink. A sleek, modern can is centered, glistening with condensation, against a dynamic, abstract background of purple and blue energy waves. The can's design is minimalist and bold." 
                            className="h-96" 
                        />
                    </aside>
                    
                    <div className="flex-grow flex justify-center">
                      {renderPage()}
                    </div>

                    <aside className="hidden xl:block w-48 flex-shrink-0">
                         <GeneratedAd 
                            prompt="A fun, vibrant advertisement for 'Puzzle Pops', a brand of healthy, no-sugar lollipops. The image features a rainbow assortment of cartoon-style lollipops with happy fruit faces on them, arranged cheerfully on a bright, playful background. The style is colorful and appealing to children and parents." 
                            className="h-96" 
                        />
                    </aside>
                </div>
            </div>
            
            <Footer onNavigate={setCurrentPage} />
        </main>
    );
};

export default App;