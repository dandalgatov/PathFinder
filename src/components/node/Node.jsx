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
    } = props

    const conditionalClass =
        isStart ?
            'start-node' : isTarget ?
                'target-node' : isWall ?
                    'wall-node' : 'space-node'
    


    return (
        <motion.div
            id={`node-${x}-${y}`}
            className={`node ${conditionalClass}`}

        ></motion.div>
    );
}

