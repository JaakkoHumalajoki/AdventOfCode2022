import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

interface Knot {
  x: number
  y: number
}

// function manipulates follows position
const moveKnot = (lead: Knot, follow: Knot) => {
  const dist = {
    x: lead.x - follow.x,
    y: lead.y - follow.y
  }

  if (Math.abs(dist.x) <= 1 && Math.abs(dist.y) <= 1) return

  // direct movement
  if (dist.y === 0 && dist.x >= 2) follow.x += 1
  else if (dist.y === 0 && dist.x <= -2) follow.x -= 1
  else if (dist.x === 0 && dist.y >= 2) follow.y += 1
  else if (dist.x === 0 && dist.y <= -2) follow.y -= 1
  // diagonal movement
  else if ((dist.x >= 2 && dist.y >= 1) || (dist.x >= 1 && dist.y >= 2)) {
    follow.x += 1
    follow.y += 1
  } else if ((dist.x >= 2 && dist.y <= -1) || (dist.x >= 1 && dist.y <= -2)) {
    follow.x += 1
    follow.y -= 1
  } else if ((dist.x <= -1 && dist.y <= -2) || (dist.x <= -2 && dist.y <= -1)) {
    follow.x -= 1
    follow.y -= 1
  } else if ((dist.x <= -2 && dist.y >= 1) || (dist.x <= -1 && dist.y >= 2)) {
    follow.x -= 1
    follow.y += 1
  }
}

const rope: Knot[] = new Array(10).fill(null).map(() => {
  return { x: 0, y: 0 }
})
const visitedCoords: string[] = []

input.split('\n').forEach((row) => {
  const parts = row.split(' ')
  if (parts.length !== 2) return
  const direction = parts[0]
  const count = Number(parts[1])

  for (let i = 0; i < count; ++i) {
    switch (direction) {
      case 'U':
        rope[0].y += 1
        break
      case 'D':
        rope[0].y -= 1
        break
      case 'R':
        rope[0].x += 1
        break
      case 'L':
        rope[0].x -= 1
    }

    rope.forEach((knot, i) => {
      if (i >= rope.length - 1) return
      moveKnot(knot, rope[i + 1])
    })

    const tail = rope[rope.length - 1]
    const tailCoords = `${tail.x}:${tail.y}`
    if (!visitedCoords.includes(tailCoords)) {
      visitedCoords.push(tailCoords)
    }
  }
})

console.log('Visited coordinates:', visitedCoords.length)
