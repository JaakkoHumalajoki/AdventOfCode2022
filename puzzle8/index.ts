import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const overlappingPairs: string[] = []

const rows = input.split('\n')
rows.forEach((row) => {
  const [left, right] = row.split(',')
  const [leftMin, leftMax] = left.split('-').map(text => Number(text))
  const [rightMin, rightMax] = right.split('-').map(text => Number(text))

  if (leftMin <= rightMin && leftMax >= rightMin) {
    overlappingPairs.push(row)
  } else if (rightMin <= leftMin && rightMax >= leftMin) {
    overlappingPairs.push(row)
  } else if (leftMin <= rightMax && leftMax >= rightMax) {
    overlappingPairs.push(row)
  } else if (rightMin <= leftMax && rightMax >= leftMax) {
    overlappingPairs.push(row)
  }
})

console.log('Overlapping pair count:', overlappingPairs.length)