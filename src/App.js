import React, { useEffect, useState } from 'react'
import './App.css';
import MazeMap from './components/mazemap/MazeMap.jsx'
import Header from './components/header/Header.jsx'
import Info from './components/info/Info.jsx'
import Controls from './components/controls/Controls.jsx'
import getMaze from './Utils/ApiGetMaze'

function App() {

  const [grid, setGrid] = useState([])
  const [initialGrid, setInitialGrid] = useState([])
  const [speed, setSpeed] = useState(10)

  useEffect(() => {
    getMaze(setGrid, setInitialGrid)
  }, [])

  return (
    <>
      <Header />
      <div className='body'>
        <div className='left'>
          <MazeMap grid={grid} />
        </div>
        <div className='right'>
          <Controls grid={grid} setGrid={setGrid} speed={speed} setSpeed={setSpeed} initialGrid={initialGrid}/>
          <Info />
        </div>
      </div>

    </>
  );
}

export default App;
