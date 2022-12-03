import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const rows = input.split('\n')

let wrongItems = ''

rows.forEach((row) => {
  const splitIndex = Math.floor(row.length / 2)
  const leftSide = row.slice(0, splitIndex)
  const rightSide = row.slice(splitIndex)

  for (let i = 0; i < leftSide.length; ++i) {
    if (rightSide.includes(leftSide[i])) {
      wrongItems = wrongItems.concat(leftSide[i])
      break
    }
  }
})

const charCode_A = 'A'.charCodeAt(0)
const charCode_a = 'a'.charCodeAt(0)
const priorities: number[] = []

for (let i = 0; i < wrongItems.length; ++i) {
  const charCode = wrongItems.charCodeAt(i)
  if (charCode >= charCode_a) {
    priorities.push(charCode - charCode_a + 1)
  } else {
    priorities.push(charCode - charCode_A + 27)
  }

}

const prioritySum = priorities.reduce((sum, value) => sum + value, 0)

console.log('Priorities total sum:', prioritySum)