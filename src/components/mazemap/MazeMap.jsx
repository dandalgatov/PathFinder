import React, { useEffect, useState } from 'react'
import axios from "axios"
import Node from "../node/Node.jsx"
import './MazeMap.css';

export default function MazeMap(props) {
    const { grid, setGrid, } = props
    

    
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
                            isSpace: node === " ",
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

    return (
        <>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div className="node-row" key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { x, y, isStart, isTarget, isWall, scale, duration } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        x={x}
                                        y={y}
                                        isStart={isStart}
                                        isTarget={isTarget}
                                        isWall={isWall}
                                        scale = {scale}
                                        duration = {duration}
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