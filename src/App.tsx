import React, { useEffect, useState } from 'react';
import { GameOfLife } from './components/Main';

type arrType = { width: number; height: number };
const arrGenerator = ({ dimensions }: { dimensions: arrType }) => {
  const arrItems = Math.floor((dimensions.height / 24) * (dimensions.width / 24));
  return Array.from({ length: arrItems }, () => false);
};
const randomDarkGreenColor = (): string => {
  const greenValue = Math.floor(Math.random() * 51);
  return `rgb(0, ${greenValue}, 0)`;
};
function App() {
  const [theme, setTheme] = useState<Array<boolean>>([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    setTheme(arrGenerator({ dimensions }));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions]);

  return (
    <div className='App'>
      {theme?.map((item, ind) => (
        <div key={ind} style={{ backgroundColor: randomDarkGreenColor() }} className='theme'></div>
      ))}
      <GameOfLife />
    </div>
  );
}

export default App;
