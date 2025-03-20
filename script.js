// script.js
import { createMaze, generateMaze } from './mazeGeneration.js';
import { AStar, Dijkstra, BFS } from './pathfindingAlgorithms.js';

class MazeVisualizer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.maze = null;
        this.algorithm = null;
        this.running = false;

        this.canvas.width = window.innerWidth * 0.8;
        this.canvas.height = window.innerHeight * 0.8;

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('a-star-btn').addEventListener('click', () => {
            this.algorithm = AStar;
        });

        document.getElementById('dijkstra-btn').addEventListener('click', () => {
            this.algorithm = Dijkstra;
        });

        document.getElementById('bfs-btn').addEventListener('click', () => {
            this.algorithm = BFS;
        });

        document.getElementById('start-btn').addEventListener('click', () => {
            this.start();
        });

        document.getElementById('pause-btn').addEventListener('click', () => {
            this.pause();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });
    }

    async start() {
        if (!this.algorithm) {
            console.error('Please select an algorithm');
            return;
        }

        if (!this.maze) {
            this.maze = await generateMaze('medium');
        }

        this.running = true;
        this.visualizePath();
    }

    pause() {
        this.running = false;
    }

    reset() {
        this.running = false;
        this.maze = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    async visualizePath() {
        const pathfinding = new this.algorithm(this.maze);
        const path = await pathfinding.findPath();

        if (!path) {
            console.error('No path found');
            return;
        }

        for (const [x, y] of path) {
            if (!this.running) break;

            this.drawMazeCell(x, y, 'path');
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

    drawMazeCell(x, y, type) {
        const cellSize = 20;
        const xPos = x * cellSize;
        const yPos = y * cellSize;

        switch (type) {
            case 'wall':
                this.ctx.fillStyle = 'black';
                break;
            case 'path':
                this.ctx.fillStyle = 'red';
                break;
            default:
                this.ctx.fillStyle = 'white';
        }

        this.ctx.fillRect(xPos, yPos, cellSize, cellSize);
    }
}

const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');

const visualizer = new MazeVisualizer(canvas, ctx);
