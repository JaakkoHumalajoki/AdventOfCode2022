import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const inputBlocks = input.split('\n\n')

interface Monkey {
  index: number
  items: number[]
  updateWorry: (item: number) => number
  throwToMonkey: (item: number) => number
  inspections: number
}

const monkeys: Monkey[] = []

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

    if (operator === '+') {
      return Math.floor((valueLeft + valueRight) / 3)
    } else if (operator === '*') {
      return Math.floor((valueLeft * valueRight) / 3)
    } else {
      // This shouldn't ever happen, operator always + or *
      return 0
    }
  }

  const divisionNumber = Number(rows[3].split(' ')[3])
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

const rounds = 20
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

const monkeyInspections = monkeys.map((monkey) => monkey.inspections).sort((a, b) => b - a)
console.log(monkeyInspections)
console.log('Monkey business:', monkeyInspections[0] * monkeyInspections[1])
