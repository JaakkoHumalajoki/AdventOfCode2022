import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const ropeHead = { x: 0, y: 0 }
const ropeTail = { x: 0, y: 0 }

const visitedCells: string[] = []

const moveTail = () => {
  const dist = {
    x: ropeHead.x - ropeTail.x,
    y: ropeHead.y - ropeTail.y
  }

  // direct movement
  if (dist.y === 0 && dist.x >= 2) ropeTail.x += 1
  else if (dist.y === 0 && dist.x <= -2) ropeTail.x -= 1
  else if (dist.x === 0 && dist.y >= 2) ropeTail.y += 1
  else if (dist.x === 0 && dist.y <= -2) ropeTail.y -= 1

  // diagonal movement
  else if ((dist.x >= 2 && dist.y >= 1) || (dist.x >= 1 && dist.y >= 2)) {
    ropeTail.x += 1
    ropeTail.y += 1
  } else if ((dist.x >= 2 && dist.y <= -1) || (dist.x >= 1 && dist.y <= -2)) {
    ropeTail.x += 1
    ropeTail.y -= 1
  } else if ((dist.x <= -1 && dist.y <= -2) || (dist.x <= -2 && dist.y <= -1)) {
    ropeTail.x -= 1
    ropeTail.y -= 1
  } else if ((dist.x <= -2 && dist.y >= 1) || (dist.x <= -1 && dist.y >= 2)) {
    ropeTail.x -= 1
    ropeTail.y += 1
  }

  const coordinateString = `${ropeTail.x}:${ropeTail.y}`
  if (!visitedCells.includes(coordinateString)) {
    visitedCells.push(coordinateString)
  }
}

input.split('\n').forEach((row) => {
  const parts = row.split(' ')
  if (parts.length !== 2) return
  const direction = parts[0]
  const count = Number(parts[1])

  for (let i = 0; i < count; ++i) {
    switch (direction) {
      case 'U':
        ropeHead.y += 1
        break
      case 'D':
        ropeHead.y -= 1
        break
      case 'R':
        ropeHead.x += 1
        break
      case 'L':
        ropeHead.x -= 1
    }

    moveTail()
  }
})

console.log("Visited coordinates:", visitedCells.length)