const sharp = require('C:/Users/20461/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs = require('fs')
const path = require('path')
const dir = path.join(process.cwd(), 'public', 'images', 'products')
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f))
let totalIn = 0, totalOut = 0
;(async () => {
  for (const f of files) {
    const inP = path.join(dir, f)
    const inBuf = fs.readFileSync(inP)
    totalIn += inBuf.length
    const outP = path.join(dir, f.replace(/\.(jpe?g|png)$/i, '.webp'))
    try {
      const buf = await sharp(inBuf)
        .rotate()
        .resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .webp({ quality: 78 })
        .toBuffer()
      fs.writeFileSync(outP, buf)
      totalOut += buf.length
      fs.unlinkSync(inP)
    } catch (e) {
      console.error('FAIL', f, e.message)
    }
  }
  console.log('files:', files.length)
  console.log('in MB: %.1f'.replace('%.1f', (totalIn/1048576).toFixed(1)))
  console.log('out MB: %.1f'.replace('%.1f', (totalOut/1048576).toFixed(1)))
  console.log('avg out KB: %.1f'.replace('%.1f', (totalOut/1024/files.length).toFixed(1)))
})()
