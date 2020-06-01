import React, { useEffect, useState } from 'react'
import axios from "axios"
import '../App.css';
import Node from "./Node.jsx"


export default function MazeMap() {

    const [grid, setGrid] = useState([])


    //This function makes an API call, and sets results in a grid state. While doing so, it also transforms each item into an object by mapping through API results and using createNodeObject to interpret the information.
    useEffect(() => {
        const apiCall = async () => {
            const apiMazeMap = await axios('https://api.noopschallenge.com/mazebot/random?minSize=20&maxSize=20')
            const mazeMap = apiMazeMap.data.map
            setGrid(
                mazeMap.map((mazeRow, x) => {
                    return mazeRow.map((node, y) => {
                        return createNodeObject(node, x, y)
                    })
                })
            )
        }
        apiCall()
    }, [])

    const createNodeObject = (node, x, y) => {
        return {
            x,
            y,
            isStart: node === "A",
            isFinish: node === "B",
            isWall: node === "X",
            isVisited: false,
            distance: Infinity,
            previousNode: null,
        };
    };

    return (
        <>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div className="row" key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { x, y, isStart, isFinish,  isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        x={x}
                                        y={y}
                                        isStart={isStart}
                                        isFinish={isFinish}
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