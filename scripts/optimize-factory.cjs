const sharp = require('C:/Users/20461/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const fs = require('fs')
const path = require('path')
const dir = path.join(process.cwd(), 'public', 'images', 'factory')
const widths = { 'hero.png': 1600, 'factory-gmp.png': 1200, 'factory-overview.png': 1200, 'factory-production.png': 1200, 'factory-line.jpg': 1200, 'team.png': 1200 }
;(async () => {
  for (const f of fs.readdirSync(dir)) {
    const inP = path.join(dir, f)
    const outP = path.join(dir, f.replace(/\.(png|jpe?g)$/i, '.webp'))
    const w = widths[f] || 1200
    try {
      const buf = await sharp(fs.readFileSync(inP)).rotate().resize({ width: w, withoutEnlargement: true }).flatten({ background: '#ffffff' }).webp({ quality: 80 }).toBuffer()
      fs.writeFileSync(outP, buf)
      fs.unlinkSync(inP)
      console.log(f, '->', outP.split('\\').pop(), (buf.length/1024).toFixed(1), 'KB')
    } catch (e) { console.error('FAIL', f, e.message) }
  }
})()
