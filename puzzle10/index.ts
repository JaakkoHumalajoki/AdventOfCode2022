import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const [stacksInput, movesInput] = input
  .split('\n\n')
  .map((block) => block.split('\n'))
stacksInput.pop()
stacksInput.reverse()

const stackCount = stacksInput[0].split(' ').length
const stacks: string[][] = Array(stackCount)
  .fill(null)
  .map(() => [])

stacksInput.forEach((row) => {
  for (let i = 1; i < row.length; i += 4) {
    if (/[\[\s\]]/.test(row[i])) continue
    const stackIndex = Math.floor(i / 4)
    stacks[stackIndex].push(row[i])
  }
})

console.log(stacks.map((stack) => stack.join('')))

movesInput.forEach((row) => {
  const parts = row.split(' ')
  const boxCount = Number(parts[1])
  const moveStart = Number(parts[3]) - 1
  const moveEnd = Number(parts[5]) - 1

  const boxes = stacks[moveStart].splice(stacks[moveStart].length - boxCount)
  stacks[moveEnd].push(...boxes)
})

console.log(stacks.map((stack) => stack.join('')))

console.log(
  'Top containers:',
  stacks.map((stack) => stack[stack.length - 1]).join('')
)
