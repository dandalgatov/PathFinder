import axios from "axios"

const getMaze = async (setGrid, setInitialGrid) => {
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
                    isPath: false,
                    distance: Infinity,
                    previousNode: null,
                }
            })
        })
    )
}

export default getMaze