import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const pointsForHand = { Y: 2, X: 1, Z: 3 }

const winPoints = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 }
}

const rows = input.split('\n')
let totalPoints = 0

rows.forEach((row) => {
  const [enemyHand, myHand] = row.split(' ')
  if (enemyHand !== 'A' && enemyHand !== 'B' && enemyHand !== 'C') return
  if (myHand !== 'X' && myHand !== 'Y' && myHand !== 'Z') return
  const handPoints = pointsForHand[myHand]
  const matchPoints = winPoints[enemyHand][myHand]
  totalPoints += handPoints + matchPoints
})

console.log('Total score:', totalPoints)
