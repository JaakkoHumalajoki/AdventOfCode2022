import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const rows = input.split('\n')

const badges: string[] = []

for (let i = 0; i < rows.length; i += 3) {
  const [back1, back2, back3] = rows.slice(i, i + 3)

  for (const letter of back1) {
    if (back2.includes(letter) && back3.includes(letter)) {
      badges.push(letter)
      break
    }
  }
}

const charCode_A = 'A'.charCodeAt(0)
const charCode_a = 'a'.charCodeAt(0)
let prioritySum = 0

for (let i = 0; i < badges.length; ++i) {
  const charCode = badges[i].charCodeAt(0)
  if (charCode >= charCode_a) {
    prioritySum += charCode - charCode_a + 1
  } else {
    prioritySum += charCode - charCode_A + 27
  }

}

console.log('Priorities total sum:', prioritySum)