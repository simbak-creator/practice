// aStar.js
class AStar {
  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.openSet = [start];
    this.closedSet = new Set();
    this.cameFrom = {};
    this.gScore = {};
    this.fScore = {};

    this.gScore[start] = 0;
    this.fScore[start] = this.heuristic(start, end);
  }

  heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
  }

  reconstructPath(cameFrom, current) {
    const path = [current];

    while (cameFrom[current]) {
      current = cameFrom[current];
      path.unshift(current);
    }

    return path;
  }

  search() {
    while (this.openSet.length > 0) {
      const current = this.openSet.reduce((min, node) => {
        if (this.fScore[node] < this.fScore[min]) {
          return node;
        }
        return min;
      }, this.openSet[0]);

      if (current === this.end) {
        return this.reconstructPath(this.cameFrom, current);
      }

      this.openSet.splice(this.openSet.indexOf(current), 1);
      this.closedSet.add(current);

      for (const neighbor of this.maze.getNeighbors(current)) {
        if (this.closedSet.has(neighbor)) {
          continue;
        }

        const tentativeGScore = this.gScore[current] + 1;

        if (!this.openSet.includes(neighbor)) {
          this.openSet.push(neighbor);
        } else if (tentativeGScore >= this.gScore[neighbor]) {
          continue;
        }

        this.cameFrom[neighbor] = current;
        this.gScore[neighbor] = tentativeGScore;
        this.fScore[neighbor] = tentativeGScore + this.heuristic(neighbor, this.end);
      }
    }

    return null;
  }
}

export default AStar;
