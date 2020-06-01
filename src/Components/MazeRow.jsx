import React from 'react'
import Node from './Node.jsx'

export default function MazeRow(props) {
    let mazeMap = props.mazeMap

    return (
        <div>
            {mazeMap.forEach(row => <Node row={row}/>) }
        </div>
    )
}
