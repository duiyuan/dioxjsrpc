const fs = require('fs')
const path = require('path')
fs.writeFileSync(
  path.resolve('lib', 'esm', 'package.json'),
  JSON.stringify({
    type: 'module',
  }),
)

const excludedModules = [
  'base64-arraybuffer',
  'js-sha512',
  'js-sha256',
  '@noble/ed25519',
  'sha256',
  'base32-encode',
  'base32-decode',
  'crc-32/crc32c.js',
  'bignumber.js',
  'crypto',
  'query-string',
  'json-bigint',
  'node-fetch',
]

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      traverseDirectory(fullPath)
    } else if (fullPath.endsWith('.js')) {
      updateImportAndExportPaths(fullPath)
    }
  })
}

function updateImportAndExportPaths(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const updatedContent = fileContent
    .replace(/(import\s+.*\s+from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
      if (!p2.endsWith('.js') && !excludedModules.some((module) => p2.includes(module))) {
        return `${p1}${p2}.js${p3}`
      }
      return match
    })
    .replace(/(export\s+.*\s+from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
      if (!p2.endsWith('.js') && !excludedModules.some((module) => p2.includes(module))) {
        return `${p1}${p2}.js${p3}`
      }
      return match
    })

  if (updatedContent !== fileContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8')
    console.log(`File Updated: ${filePath}`)
  }
}

traverseDirectory(path.resolve(__dirname, 'lib', 'esm'))
