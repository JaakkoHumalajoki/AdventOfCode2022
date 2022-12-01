const fs = require('fs')

const caloryInput = fs.readFileSync('input.txt', 'utf8')

const inputSplit = caloryInput.split('\n')
const caloriesPerElf = [0]

for (let i = 0; i < inputSplit.length; ++i) {
  const row = inputSplit[i]
  if (row === '') {
    caloriesPerElf.push(0)
    continue
  }

  const value = Number(row)
  caloriesPerElf[caloriesPerElf.length - 1] += value
}

let mostCalories = caloriesPerElf.reduce((highest, value) => {
  if (highest < value) return value
  return highest
}, 0)

console.log(`Highest calory count is ${mostCalories}`)