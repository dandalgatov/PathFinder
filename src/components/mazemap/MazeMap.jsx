import React, { useEffect, useState } from 'react'
import Node from "../node/Node.jsx"
import './MazeMap.css'

export default function MazeMap(props) {
    const { grid } = props

    return (
        <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                    <div className="node-row" key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { x, y, isStart, isTarget, isWall, isSpace, isVisited, isPath} = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    x={x}
                                    y={y}
                                    isStart={isStart}
                                    isTarget={isTarget}
                                    isWall={isWall}
                                    isSpace={isSpace}
                                    isVisited={isVisited}
                                    isPath={isPath}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    )
}


