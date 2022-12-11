import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const inputBlocks = input.split('\n\n')

// ended up as pointless, the lowest common for input is maxMultiple
const findLowestMultiple = (numbers: number[]): number => {
  const maxMultiple = numbers.reduce((total, number) => total * number, 1)
  const highest = numbers.sort((a, b) => b - a)[0]
  
  for (let i = 1; highest * i < maxMultiple; ++i) {
    const multiple = highest * i
    if (numbers.every(number => multiple % number === 0)) {
      return multiple
    }
  }

  return maxMultiple
}

interface Monkey {
  index: number
  items: number[]
  updateWorry: (item: number) => number
  throwToMonkey: (item: number) => number
  inspections: number
}

const monkeys: Monkey[] = []
const dividers: number[] = []
// lowestMultiple is updated after all dividers are known
let lowestMultiple = Number.MAX_VALUE

inputBlocks.forEach((block) => {
  const rows = block.split('\n').map((row) => row.trim())
  if (rows.length !== 6) return

  const index = Number(rows[0].split(' ')[1].replace(':', ''))
  const items = rows[1]
    .split(' ')
    .slice(2)
    .map((text) => Number(text.replace(',', '')))

  const updateWorryParts = rows[2].split(' ').slice(3)
  const [partLeft, operator, partRight] = updateWorryParts

  const updateWorry = (item: number) => {
    const valueLeft = partLeft === 'old' ? item : Number(partLeft)
    const valueRight = partRight === 'old' ? item : Number(partRight)
    let result = 0

    if (operator === '+') {
      result = valueLeft + valueRight
    } else {
      result = valueLeft * valueRight
    }

    // at lowestMultiple, situation is the same as if item worry was zero
    if (result >= lowestMultiple) {
      result = result % lowestMultiple
    }
    return result
  }

  const divisionNumber = Number(rows[3].split(' ')[3])
  dividers.push(divisionNumber)
  const monkeyIfTrue = Number(rows[4].split(' ')[5])
  const monkeyIfFalse = Number(rows[5].split(' ')[5])
  const throwToMonkey = (item: number) => {
    if (item % divisionNumber === 0) {
      return monkeyIfTrue
    } else {
      return monkeyIfFalse
    }
  }

  const monkey: Monkey = {
    index,
    items,
    updateWorry,
    throwToMonkey,
    inspections: 0
  }
  monkeys.push(monkey)
})

lowestMultiple = findLowestMultiple(dividers)

const rounds = 10_000
for (let i = 0; i < rounds; ++i) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const worry = monkey.updateWorry(item)
      monkey.inspections += 1
      const throwTarget = monkey.throwToMonkey(worry)
      monkeys[throwTarget].items.push(worry)
    })
    monkey.items = []
  })
}

const monkeyInspections = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a)
console.log(monkeyInspections)
console.log('Monkey business:', monkeyInspections[0] * monkeyInspections[1])
