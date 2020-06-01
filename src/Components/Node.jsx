import React from 'react';
import '../App.css';

export default function Node(props) {

    const {
        x,
        y,
        isStart,
        isFinish,
        isWall,
    } = props

    const conditionalClass =
        isStart ?
            'start-node' : isFinish ?
                'target-node' : isWall ?
                    'wall-node' : 'space-node'

    return (
        <div
            id={`node-${x}-${y}`}
            className={`node ${conditionalClass}`}
        ></div>
    );
}
