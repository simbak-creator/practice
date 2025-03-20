// maze.js
class Maze {
  constructor(width, height, depth) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.cells = [];

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        for (let z = 0; z < depth; z++) {
          this.cells.push({
            x,
            y,
            z,
            walls: [true, true, true, true, true, true], // top, bottom, left, right, front, back
          });
        }
      }
    }

    this.generate();
  }

  generate() {
    const stack = [];
    let current = this.cells[0];

    while (true) {
      current.visited = true;
      stack.push(current);

      const neighbors = this.getUnvisitedNeighbors(current);
      if (neighbors.length > 0) {
        const next = neighbors[Math.floor(Math.random() * neighbors.length)];
        this.removeWall(current, next);
        current = next;
      } else if (stack.length > 0) {
        current = stack.pop();
      } else {
        break;
      }
    }
  }

  getUnvisitedNeighbors(cell) {
    const neighbors = [];

    if (cell.x > 0 && !this.cells[cell.x - 1 + cell.y * this.width + cell.z * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x - 1 + cell.y * this.width + cell.z * this.width * this.height]);
    }

    if (cell.x < this.width - 1 && !this.cells[cell.x + 1 + cell.y * this.width + cell.z * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x + 1 + cell.y * this.width + cell.z * this.width * this.height]);
    }

    if (cell.y > 0 && !this.cells[cell.x + (cell.y - 1) * this.width + cell.z * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x + (cell.y - 1) * this.width + cell.z * this.width * this.height]);
    }

    if (cell.y < this.height - 1 && !this.cells[cell.x + (cell.y + 1) * this.width + cell.z * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x + (cell.y + 1) * this.width + cell.z * this.width * this.height]);
    }

    if (cell.z > 0 && !this.cells[cell.x + cell.y * this.width + (cell.z - 1) * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x + cell.y * this.width + (cell.z - 1) * this.width * this.height]);
    }

    if (cell.z < this.depth - 1 && !this.cells[cell.x + cell.y * this.width + (cell.z + 1) * this.width * this.height].visited) {
      neighbors.push(this.cells[cell.x + cell.y * this.width + (cell.z + 1) * this.width * this.height]);
    }

    return neighbors;
  }

  removeWall(cell1, cell2) {
    // Remove the wall between two cells
    if (cell1.x === cell2.x) {
      if (cell1.y < cell2.y) {
        cell1.walls[2] = false;
        cell2.walls[3] = false;
      } else {
        cell1.walls[3] = false;
        cell2.walls[2] = false;
      }
    } else if (cell1.y === cell2.y) {
      if (cell1.x < cell2.x) {
        cell1.walls[0] = false;
        cell2.walls[1] = false;
      } else {
        cell1.walls[1] = false;
        cell2.walls[0] = false;
      }
    } else {
      if (cell1.z < cell2.z) {
        cell1.walls[4] = false;
        cell2.walls[5] = false;
      } else {
        cell1.walls[5] = false;
        cell2.walls[4] = false;
      }
    }
  }
}

export default Maze;
