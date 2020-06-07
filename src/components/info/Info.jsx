import React from 'react'
import './Info.css'

export default function Info() {
    return (
        <div className='info'>
            <h2>Info</h2>
            <p>In the beginning we assume two things</p>
            <p>1. Our start node is 0 distance away</p>
            <p>2. All other nodes are Infinity distance away</p>
            <p>Next we check all the neighbors</p>
            <p>1. Is the neighbor on the map?</p>
            <p>2. Did we already visit that neighbor?</p>
            <p>If not, we give that neighbor distance on +1</p>
            <p>We heap sort our array array of unvisited nodes, deciding where to go based on the node with shortest distance from our starting point</p>
            <p>We move to that node, mark it as visited, note which node we arrived from, and repeat steps from above</p>
            <p>We ignore walls as viable neighbors, and have some error catching incase we are stuck.</p>
            <p>Once our next closest node to the start is our target node, we just backtrack through the nodes, since we logged the previous node in the memory of the current node.</p>
            <p>Now we have a direct path from start node to target node.</p>
        </div>
    )
}
