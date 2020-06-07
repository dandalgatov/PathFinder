import React, { useEffect, useState } from 'react'
import './App.css';
import MazeMap from './components/mazemap/MazeMap.jsx'
import Header from './components/header/Header.jsx'
import Info from './components/info/Info.jsx'
import Controls from './components/controls/Controls.jsx'

function App() {

  const [grid, setGrid] = useState([])
  // const [apiCall, getApiCall] = useState([])


  return (
    <>
      <Header />
      <div className='body'>
        <div className='left'>
          <MazeMap grid={grid} setGrid={setGrid}/>
        </div>
        <div className='right'>
          <Controls grid={grid} setGrid={setGrid}/>
          <Info />
        </div>
      </div>

    </>
  );
}

export default App;
