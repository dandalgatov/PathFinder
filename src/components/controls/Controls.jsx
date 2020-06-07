import React from 'react'
import './Controls.css'
import { dijkstra, getDijkstraPath, visualizeDijkstra } from '../../Utils/DijkstraAlgorithm'
import axios from "axios"

export default function Controls(props) {

    const { grid, setGrid } = props

    const removeWalls = () => {
        const flatGrid = [].concat(...grid)
        for (let i = 0; i < flatGrid.length; i++) {
            const node = flatGrid[i]
            const nodeDOM = document.getElementById(`node-${node.x}-${node.y}`)
            if (node.isWall === true) {
                nodeDOM.className = 'node space-node'
                node.isWall = false
            }
        }
    }

    const dijkstra = () => {
        visualizeDijkstra(grid)
    }


    const apiCall = async () => {
        const apiMazeMap = await axios('https://api.noopschallenge.com/mazebot/random?minSize=60&maxSize=60')
        const mazeMap = apiMazeMap.data.map
        setGrid(
            mazeMap.map((mazeRow, x) => {
                return mazeRow.map((node, y) => {
                    return {
                        x,
                        y,
                        isStart: node === "A",
                        isTarget: node === "B",
                        isWall: node === "X",
                        isVisited: false,
                        distance: Infinity,
                        previousNode: null,
                    }
                })
            })
        )
    }



    return (
        <div className='controls'>
            <h2>Controls</h2>
            <ul><button>
            Reset Maze
            </button>
            <button onClick = {apiCall}>
            Render New Maze
            </button>
            <button onClick={removeWalls}>
            Remove Walls
            </button>
            </ul>
            <button onClick={dijkstra}>
                Visualize Dijkstra's Algorithm
            </button>
            <button onClick={dijkstra}>
                Visualize Dijkstra's Algorithm
            </button>


        </div>
    )

}