const fs = require('fs')
const path = require('path')
fs.writeFileSync(
  path.resolve('dist', 'package.json'),
  JSON.stringify({
    type: 'module',
  }),
)
