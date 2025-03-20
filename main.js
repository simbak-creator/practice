// main.js
import Maze from './maze.js';
import AStar from './aStar.js';
import Renderer from './renderer.js';

const canvas = document.getElementById('canvas');
const renderer = new Renderer(canvas);

const maze = new Maze(20, 20, 20);
renderer.drawMaze(maze);

const start = maze.cells[0];
const end = maze.cells[maze.cells.length - 1];

const aStar = new AStar(maze, start, end);
const path = aStar.search();

if (path) {
  console.log(path);
} else {
  console.log('No path found');
}
