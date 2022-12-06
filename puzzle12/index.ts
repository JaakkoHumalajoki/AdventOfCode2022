import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

let buffer = ""
let answer = 0

for (let i = 0; i < input.length; ++i) {
  const char = input[i]
  if (buffer.includes(char)) {
    buffer += char
    const cutPoint = buffer.indexOf(char)
    buffer = buffer.slice(cutPoint + 1)
  } else {
    buffer += char
    if (buffer.length === 14) {
      answer = i + 1
      break
    }
  }
}

console.log(buffer, answer)