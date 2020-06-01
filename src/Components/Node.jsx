import React from 'react'

export default function Node(props) {
    let mazeMap = props.mazeMap
    let mazeRow = mazeMap.forEach(row => {
        row.forEach (node => console.log(node))
    })


    
    return (
        <div>
         {mazeRow}
       
        </div>
    )
}
