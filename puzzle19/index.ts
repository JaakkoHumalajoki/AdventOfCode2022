import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const signalStrengths: number[] = []
let x = 1
let cycle = 1

input.split('\n').forEach((row) => {
  signalStrengths.push(cycle * x)
  cycle += 1

  const parts = row.split(' ')
  if (parts[0] === 'noop') return
  if (parts[0] === 'addx' && parts.length === 2) {
    signalStrengths.push(cycle * x)
    cycle += 1
    const count = Number(parts[1])
    x += count
  }
})

const signalIndexes = [19, 59, 99, 139, 179, 219]
const importantSignals = signalStrengths.filter((_signal, i) => signalIndexes.includes(i))

console.log(importantSignals)

const sum = importantSignals.reduce((sum, value) => sum + value, 0)
console.log('Sum:', sum)