import fs from 'fs'

const pointsForHand = { A: 1, B: 2, C: 3 }

const winPoints = {
  A: { A: 3, B: 6, C: 0 },
  B: { A: 0, B: 3, C: 6 },
  C: { A: 6, B: 0, C: 3 }
}

const instructionGuide = {
  X: { A: 'C', B: 'A', C: 'B' },
  Y: { A: 'A', B: 'B', C: 'C' },
  Z: { A: 'B', B: 'C', C: 'A' }
}

const input = fs.readFileSync('input.txt', 'utf8')

const rows = input.split('\n')
let totalPoints = 0

rows.forEach((row) => {
  const [enemyHand, instruction] = row.split(' ')
  if (enemyHand !== 'A' && enemyHand !== 'B' && enemyHand !== 'C') return
  if (instruction !== 'X' && instruction !== 'Y' && instruction !== 'Z') return
  const myHand = instructionGuide[instruction][enemyHand] as 'A' | 'B' | 'C'

  const handPoints = pointsForHand[myHand]
  const matchPoints = winPoints[enemyHand][myHand]
  totalPoints += handPoints + matchPoints
})

console.log('Total score:', totalPoints)
