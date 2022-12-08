import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const grid: number[][] = []

input.split('\n').forEach((row) => {
  const gridRow = row.split('').map((char) => Number(char))
  grid.push(gridRow)
})

const gridHeight = grid.length
const gridWidth = grid[0].length
console.log(`${gridWidth}x${gridHeight} grid`)

// Function expects trees in order of closest -> farthest
const calculateScore = (trees: number[], homeHeight: number): number => {
  for (let i = 0; i < trees.length; ++i) {
    if (trees[i] >= homeHeight) return i + 1
  }
  return trees.length
}

const visibilityScore = (x: number, y: number): number => {
  if (x === 0 || y === 0) return 0
  if (x === gridWidth - 1 || y === gridHeight - 1) return 0

  const homeHeight = grid[y][x]

  const leftTrees = grid[y].slice(0, x)
  const leftScore = calculateScore(leftTrees.reverse(), homeHeight)

  const rightTrees = grid[y].slice(x + 1)
  const rightScore = calculateScore(rightTrees, homeHeight)

  const upTrees = grid.map((row) => row[x]).filter((tree, i) => i < y)
  const upScore = calculateScore(upTrees.reverse(), homeHeight)

  const downTrees = grid.map((row) => row[x]).filter((tree, i) => i > y)
  const downScore = calculateScore(downTrees, homeHeight)

  return leftScore * rightScore * upScore * downScore
}

const scoreGrid = grid.map((row, y) =>
  row.map((tree, x) => visibilityScore(x, y))
)

const highscore = scoreGrid.flat().reduce((sum, value) => {
  if (value > sum) return value
  return sum
}, 0)

console.log('Highest visibility score:', highscore)
