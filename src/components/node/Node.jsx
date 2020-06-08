import React from 'react';
import { motion } from "framer-motion"
import './Node.css';

export default function Node(props) {

    const {
        x,
        y,
        isStart,
        isTarget,
        isWall,
        isSpace,
        isVisited,
        isPath
    } = props


    const conditionalClass =
        isStart ? 'start-node'
            : isTarget ? 'target-node'
                : isPath ? 'shortest-path-node'
                    : isVisited ? 'visited-node'
                        : isSpace ? 'space-node'
                            : isWall ? 'wall-node'
                                : ''



    return (
        <motion.div
            id={`node-${x}-${y}`}
            className={`node ${conditionalClass}`}

        ></motion.div>
    );
}

