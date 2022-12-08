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

const treeVisible = (x: number, y: number): boolean => {
  if (x === 0 || y === 0) return true
  if (x === gridWidth - 1 || y === gridHeight - 1) return true

  const targetHeight = grid[y][x]

  const leftTrees = grid[y].slice(0, x)
  if (leftTrees.every((tree) => tree < targetHeight)) return true

  const rightTrees = grid[y].slice(x + 1)
  if (rightTrees.every((tree) => tree < targetHeight)) return true

  const upTrees = grid.map((row) => row[x]).filter((tree, i) => i < y)
  if (upTrees.every((tree) => tree < targetHeight)) return true

  const downTrees = grid.map((row) => row[x]).filter((tree, i) => i > y)
  if (downTrees.every((tree) => tree < targetHeight)) return true

  return false
}

let visibleCount = 0
for (let y = 0; y < gridHeight; ++y) {
  for (let x = 0; x < gridWidth; ++x) {
    if (treeVisible(x, y)) visibleCount += 1
  }
}

console.log('Visible:', visibleCount)
