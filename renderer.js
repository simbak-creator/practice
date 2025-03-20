// renderer.js
class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawMaze(maze) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const cell of maze.cells) {
      if (cell.walls[0]) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell.x * 10, cell.y * 10);
        this.ctx.lineTo((cell.x + 1) * 10, cell.y * 10);
        this.ctx.stroke();
      }

      if (cell.walls[1]) {
        this.ctx.beginPath();
        this.ctx.moveTo(cell.x * 10, (cell.y + 1) * 10);
        this.ctx.lineTo((cell.x + 1) * 10, (cell.y + 1) * 10);
        this.ctx.stroke();
      }

      // ...
    }
  }
}

export default Renderer;
