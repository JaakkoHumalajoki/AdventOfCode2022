import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

interface Folder {
  name: string
  size: number
  parentFolder: string | null
}

const folders: Folder[] = [{ name: 'base', size: 0, parentFolder: null }]
let currentPath: string[] = ['base']

const addFolder = (name: string) => {
  const parentFolderName = currentPath.join('/')
  const newFolderName = `${parentFolderName}/${name}`

  // if folder had already been added before
  if (folders.find((f) => f.name === newFolderName)) return

  const newFolder = {
    name: newFolderName,
    size: 0,
    parentFolder: parentFolderName
  }

  folders.push(newFolder)
}

const changeDirectory = (path: string) => {
  if (path === '/') {
    currentPath = ['base']
  } else if (path === '..') {
    if (currentPath.length > 1) {
      currentPath.pop()
    }
  } else {
    addFolder(path)
    currentPath.push(path)
  }
}

// Recursively adding fileSize to all folders from bottom to up
const addFile = (fileSize: number, folderName: string) => {
  const folder = folders.find((f) => f.name === folderName)
  if (!folder) return
  folder.size += fileSize

  if (folder.parentFolder === null) return
  addFile(fileSize, folder.parentFolder)
}

input.split('\n').forEach((row) => {
  const parts = row.split(' ')
  if (parts.length < 2) return
  if (parts[0] === '$') {
    if (parts[1] === 'cd') {
      changeDirectory(parts[2])
    }
  } else if (parts[0] === 'dir') {
    return
  } else {
    // has to be a file definition
    const fileSize = Number(parts[0])
    addFile(fileSize, currentPath.join('/'))
  }
})

const foldersFiltered = folders.filter((f) => f.size < 100_000)
const totalSize = foldersFiltered.reduce((sum, folder) => sum += folder.size, 0)

console.log('Sum of sizes:', totalSize)
