import React, { useEffect, useState } from 'react'
import { Link, Route } from "react-router-dom"
import axios from "axios"
s

export default function MazeMap() {
    
    const [mazeMap, updateMazeMap] = useState([])
    
    useEffect(() => {
        const apiCall = async () => {
          const apiMazeMap = await axios('https://api.noopschallenge.com/mazebot/random?minSize=10&maxSize=10')
          updateMazeMap(apiMazeMap.data.map)
        }
        apiCall()
    }, [])

    console.log(mazeMap)
    



    return (
        <div>   
            <MazeRow mazeMap = {mazeMap}/>
        </div>
    )
}
