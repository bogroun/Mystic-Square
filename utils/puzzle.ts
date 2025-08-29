import type { Board, TileValue, Proximity } from '../types';

export const EMPTY_TILE_VALUE: null = null;

export const createSolvedBoard = (gridSize: number): Board => {
  const board: Board = [];
  let count = 1;
  for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
      if (i === gridSize - 1 && j === gridSize - 1) {
        board[i][j] = EMPTY_TILE_VALUE;
      } else {
        board[i][j] = count++;
      }
    }
  }
  return board;
};

export const findTilePos = (board: Board, value: TileValue): { row: number; col: number } | null => {
  const gridSize = board.length;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === value) {
        return { row, col };
      }
    }
  }
  return null;
};

export const shuffleBoard = (board: Board): Board => {
  let newBoard = board.map(row => [...row]);
  const gridSize = board.length;
  const shuffleMoves = gridSize * gridSize * 20;

  let emptyPos = findTilePos(newBoard, EMPTY_TILE_VALUE);
  if (!emptyPos) return newBoard;

  let lastMove: {row: number, col: number} | null = null;

  for (let i = 0; i < shuffleMoves; i++) {
    const validMoves: { row: number; col: number }[] = [];
    const { row, col } = emptyPos;

    if (row > 0) validMoves.push({ row: row - 1, col });
    if (row < gridSize - 1) validMoves.push({ row: row + 1, col });
    if (col > 0) validMoves.push({ row, col: col - 1 });
    if (col < gridSize - 1) validMoves.push({ row, col: col + 1 });
    
    const possibleMoves = validMoves.filter(move => !lastMove || (move.row !== lastMove.row || move.col !== lastMove.col));
    
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    if (randomMove) {
        lastMove = {row, col};
        newBoard[row][col] = newBoard[randomMove.row][randomMove.col];
        newBoard[randomMove.row][randomMove.col] = EMPTY_TILE_VALUE;
        emptyPos = randomMove;
    }
  }

  return newBoard;
};

export const isSolved = (board: Board): boolean => {
  const gridSize = board.length;
  let count = 1;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i === gridSize - 1 && j === gridSize - 1) {
        if (board[i][j] !== EMPTY_TILE_VALUE) return false;
      } else {
        if (board[i][j] !== count++) return false;
      }
    }
  }
  return true;
};

export const getTileCorrectPosition = (value: TileValue, gridSize: number): { row: number; col: number } | null => {
    if (value === EMPTY_TILE_VALUE) {
        return { row: gridSize - 1, col: gridSize - 1 };
    }
    if (value === null || value < 1 || value > gridSize * gridSize - 1) return null;
    const row = Math.floor((value - 1) / gridSize);
    const col = (value - 1) % gridSize;
    return { row, col };
};

export const getTileProximity = (value: TileValue, currentRow: number, currentCol: number, gridSize: number): Proximity => {
    if (value === EMPTY_TILE_VALUE) return 'empty';
    const correctPos = getTileCorrectPosition(value, gridSize);
    if (!correctPos) return 'far';

    if (currentRow === correctPos.row && currentCol === correctPos.col) {
        return 'correct';
    }

    const manhattanDistance = Math.abs(currentRow - correctPos.row) + Math.abs(currentCol - correctPos.col);
    if (manhattanDistance === 1) {
        return 'close';
    }

    return 'far';
};

export const serializeBoard = (board: Board): string => {
  return board.flat().map(v => v === null ? 'e' : v).join(',');
};

export const deserializeBoard = (hash: string): Board | null => {
    try {
        const items = hash.replace(/^#/, '').split(',');
        const size = Math.sqrt(items.length);
        if (![3, 4, 5].includes(size)) return null;

        const board: Board = [];
        for (let i = 0; i < size; i++) {
            board.push([]);
            for (let j = 0; j < size; j++) {
                const item = items[i * size + j];
                board[i][j] = item === 'e' ? null : parseInt(item, 10);
            }
        }
        return board;
    } catch (e) {
        return null;
    }
};
