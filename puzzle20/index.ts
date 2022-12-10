import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

const screen: string[] = []
let x = 1
let cycle = 0

const printPixel = () => {
  const spritePos = [(x - 1), x, (x + 1)]
  const printPos = cycle % 40
  if (spritePos.includes(printPos)) {
    screen.push('#')
  } else {
    screen.push('.')
  }
}

input.split('\n').forEach((row) => {
  printPixel()
  cycle += 1

  const parts = row.split(' ')
  if (parts[0] === 'noop') return
  if (parts[0] !== 'addx' || parts.length !== 2) return

  printPixel()
  cycle += 1

  const count = Number(parts[1])
  x += count
})

const screenRows: string[] = []
while (screen.length > 0) {
  const row = screen.splice(0, 40).join('')
  screenRows.push(row)
}
console.log(screenRows)