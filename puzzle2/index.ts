import fs from 'fs'

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

const sorted = caloriesPerElf.sort((a, b) => b - a)
const [s1, s2, s3] = sorted

console.log(`Top three: ${s1}, ${s2}, ${s3}`)
console.log(`Total: ${s1 + s2 + s3}`)
