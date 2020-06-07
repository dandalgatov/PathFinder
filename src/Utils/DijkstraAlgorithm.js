// visualizeDijstra [Passes full grid and start/target nodes to dijstra. Uses returned info to invoke animation]
//   |__ dijkstra [Facilitates sort and neighbor updates. Specifies cases like being trapped or when we reach the target]
//     |__ heapSort [Evokes heapify to build the heap, and then everytime we remove smallest value, it heapifies the rest]
//       |__heapify [Buids a heap from bottom up.]
//     |__updateNeighbors [Checks for neighbors around the node, and adds a +1 distance to unvisited nodes. Logs previous node in the history of current node.]
//   |__getDijkstraPath [Uses previos node history created by updateNeighbor to backtrack a path from target to start node.]
//   |__animateDijstra [animates all the visited nodes]
//     |__animateDijkstraPath [animates shortest path nodes]

export function visualizeDijkstra(grid) {
    const flatGrid = [].concat(...grid)
    const startNode = flatGrid.find(node => node.isStart === true)
    const targetNode = flatGrid.find(node => node.isTarget === true)
    const visitedNodes = dijkstra(grid, startNode, targetNode);
    const dijkstraPath = getDijkstraPath(targetNode);
    animateDijkstra(visitedNodes, dijkstraPath);
}

const animateDijkstra = (visitedNodes, dijkstraPath) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
            setTimeout(() => {
                animateDijkstraPath(dijkstraPath);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodes[i]
            const nodeDOM = document.getElementById(`node-${node.x}-${node.y}`)
            if (node.isStart === true) {
                nodeDOM.className = 'node start-node'
            } else if (node.isTarget === true) {
                nodeDOM.className = 'node target-node'
            } else {
                nodeDOM.className = 'node visited-node'
            }
        }, 10 * i);
    }
}

const animateDijkstraPath = (dijkstraPath) => {
    for (let i = 0; i < dijkstraPath.length; i++) {
        setTimeout(() => {
            const node = dijkstraPath[i]
            const nodeDOM = document.getElementById(`node-${node.x}-${node.y}`)
            if (node.isStart === true) {
                nodeDOM.className = 'node start-node'
            } else if (node.isTarget === true) {
                nodeDOM.className = 'node target-node'
            } else {
                nodeDOM.className = 'node shortest-path-node'
                node.scale = 2
                node.duration = 0.5
            }
        }, 10 * i);
    }
}

function dijkstra(grid, startNode, targetNode) {
    const unvisitedNodes = [].concat(...grid) // List of all nodes in a single array (flattnening 2 dimentional array)
    const visitedNodes = []

    startNode.distance = 0

    while (!!unvisitedNodes.length) { // While there still unvisited nodes...
        heapSort(unvisitedNodes) // ...sort them by distance from the start node. 
        const closestNode = unvisitedNodes.shift() // Yank the fist (smallest) item out of the array.

        if (closestNode.isWall) continue // If the item is a wall, skip this loop and move on to the next one.
        if (closestNode.distance === Infinity) return visitedNodes // If closest node is infinity, we are trapped.

        closestNode.isVisited = true // Update node's isVisited property to "true".
        visitedNodes.push(closestNode) // Add to visited pile

        if (closestNode === targetNode) return visitedNodes // If closest node is target node, than we have arrived.
        updateNeighbors(closestNode, grid) // As long as the neighbor is on the map, and has not been visited, we give them a distance of +1 from the start node, and log the current node as the previousNode.
    }
}

let heapify = (arr, n, i) => {
    let largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2
    if (left < n && arr[i].distance < arr[left].distance) {
        largest = left
    }
    if (right < n && arr[largest].distance < arr[right].distance) {
        largest = right
    }
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]
        heapify(arr, n, largest)
    }
}

let heapSort = (arr) => {
    let n = arr.length
    for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        heapify(arr, n, i)
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[i], arr[0]] = [arr[0], arr[i]]
        heapify(arr, i, 0)
    }
}

function updateNeighbors(node, grid) {
    const neighbors = [];
    const { x, y } = node;
    if (x > 0) neighbors.push(grid[x - 1][y]);
    if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
    if (y > 0) neighbors.push(grid[x][y - 1]);
    if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);
    const unvisitedNeighbors = neighbors.filter(neighbor => !neighbor.isVisited)
    unvisitedNeighbors.forEach((neighbor) => {
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    })
}


// Backtracks from the targetNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getDijkstraPath(targetNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = targetNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}