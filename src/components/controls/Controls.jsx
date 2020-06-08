import React from 'react'
import './Controls.css'
import { visualizeDijkstra } from '../../Utils/DijkstraAlgorithm'
import getMaze from '../../Utils/ApiGetMaze'

export default function Controls(props) {

    const { grid, setGrid, speed, setSpeed } = props

    const removeWalls = () => {
        grid.forEach(row => row.forEach(node => {
            node.isWall = false
            node.isSpace = true
            node.isVisited = false
            node.isPath = false
            node.distance = Infinity
            node.previousNode = null

            const nodeDOM = document.getElementById(`node-${node.x}-${node.y}`)
            if (node.isStart === true) {
                nodeDOM.className = 'node start-node'
            } else if (node.isTarget === true) {
                nodeDOM.className = 'node target-node'
            } else {
                nodeDOM.className = 'node space-node'
            }
        }))
    }

    const dijkstra = () => {
        visualizeDijkstra(grid, speed, setGrid)
        
    }

    const newApiCall = () => {
        resetMaze()
        getMaze(setGrid)
    }

    const resetMaze = () => {
        grid.forEach(row => row.forEach(node => {
            const nodeDOM = document.getElementById(`node-${node.x}-${node.y}`)
            if (nodeDOM.className === 'node shortest-path-node' || nodeDOM.className === 'node visited-node' || node.isSpace === true) {
                nodeDOM.className = 'node space-node'
                node.isVisited = false
                node.isPath = false
                node.distance = Infinity
                node.previousNode = null
            } else if (node.isWall === true) {
                nodeDOM.className = 'node wall-node'
            } else if (node.isStart === true) {
                nodeDOM.className = 'node start-node'
            } else if (node.isTarget === true) {
                nodeDOM.className = 'node target-node'
            }
        }))
    }

    return (
        <div className='controls'>
            <h2>Controls</h2>
            <ul>
                <li><button onClick={resetMaze}>
                    Reset Maze
                </button></li>
                <li><button onClick={newApiCall}>
                    Render New Maze
                </button></li>
                <li><button onClick={removeWalls}>
                    Remove Walls
                </button></li>
            </ul>

            <ul><li><button onClick={dijkstra}>
                Visualize Dijkstra's Algorithm
            </button></li></ul>
            <ul>
                <li><button onClick={() => setSpeed(100)}>
                    Speed = Slow
                </button></li>
                <li><button onClick={() => setSpeed(10)}>
                    Speed = Normal
                </button></li>
                <li><button onClick={() => setSpeed(1)}>
                    Speed = Fast
                </button></li>
            </ul>



        </div>
    )

}