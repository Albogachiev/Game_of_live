import React, { useState, useCallback, useEffect } from 'react';
import '../index.css';

const arrGenerator = (): arrType => {
  const numRows = 25;
  const numCols = 25;
  return Array.from({ length: numRows }, () => Array(numCols).fill(false));
};

type arrType = Array<Array<boolean>>;
interface NeighborsProps {
  arr: arrType;
  rowIndex: number;
  colIndex: number;
}

const searchNeighbors = ({ arr, rowIndex, colIndex }: NeighborsProps) => {
  let count = 0;
  const indNeighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  indNeighbors.forEach(([row, col]) => {
    const newRow = row + rowIndex;
    const newCol = col + colIndex;
    if (newRow < 0 || newRow > arr.length - 1 || newCol < 0 || newCol > arr[0].length - 1) return;
    count += arr[newRow][newCol] ? 1 : 0;
  });
  return count;
};

const nextGeneration = (arr: arrType) => {
  let newArr = arr.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      const res = searchNeighbors({ arr, rowIndex, colIndex });
      if (col && (res === 2 || res === 3)) {
        return true;
      }
      if (!col && res === 3) {
        return true;
      }
      return false;
    }),
  );
  return newArr;
};

export const GameOfLife = () => {
  const [grid, setGrid] = useState<arrType>(arrGenerator);
  const [run, setRun] = useState(false);

  const toggleCell = useCallback(
    ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => {
      const newGrid = [...grid];
      newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
      setGrid(newGrid);
    },
    [],
  );

  useEffect(() => {
    if (!run) return;
    const interval = setInterval(() => {
      setGrid((prev) => nextGeneration(prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [run]);

  return (
    <div className='grid'>
      {grid?.map((row, rowIndex) =>
        row?.map((item, colIndex) => (
          <div
            key={colIndex}
            style={item ? { backgroundColor: 'black' } : { backgroundColor: 'white' }}
            onClick={() => toggleCell({ rowIndex, colIndex })}
            className={item ? 'cell cellIsActiv' : 'cell'}
          ></div>
        )),
      )}
      <div className='startClick' onClick={() => setRun(!run)}>
        {run ? 'Стоп' : 'Старт'}
      </div>
    </div>
  );
};
