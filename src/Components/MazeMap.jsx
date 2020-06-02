import React, { useEffect, useState } from 'react'
import axios from "axios"
import { dijkstra, getDijkstraPath } from '../Utils/DijkstraAlgorithm'
import Node from "./Node.jsx"
import '../App.css';


export default function MazeMap() {

    const [grid, setGrid] = useState([])


    useEffect(() => {
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
        apiCall()
    }, [])


    const visualizeDijkstra = () => {
        const flatGrid = [].concat(...grid)
        const startNode = flatGrid.find(node => node.isStart === true)
        const targetNode = flatGrid.find(node => node.isTarget === true)
        const visitedNodes = dijkstra(grid, startNode, targetNode);
        const dijkstraPath = getDijkstraPath(targetNode);
        animateDijkstra(visitedNodes, dijkstraPath);
    }

    const animateDijkstra = (visitedNodes, dijkstraPath) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    animateDijkstraPath(dijkstraPath);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className =
                    'node visited-node';
            }, 10 * i);
        }
    }

    const animateDijkstraPath = (dijkstraPath) => {
        for (let i = 0; i < dijkstraPath.length; i++) {
            setTimeout(() => {
                const node = dijkstraPath[i];
                document.getElementById(`node-${node.x}-${node.y}`).className =
                    'node shortest-path-node';
            }, 10 * i);
        }
    }

    return (
        <>
            <button onClick={() => visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div className="node-row" key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { x, y, isStart, isTarget, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        x={x}
                                        y={y}
                                        isStart={isStart}
                                        isTarget={isTarget}
                                        isWall={isWall}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    )
}