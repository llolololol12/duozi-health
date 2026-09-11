// ---------------------------------------------------------------------------
// DUOZI Health — SVG asset generator
// Generates all website imagery (hero, factory, categories, products) as
// lightweight, consistent SVG files under /public/images.
// Run with:  node scripts/generate-assets.mjs   (or `npm run assets`)
// ---------------------------------------------------------------------------
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'images')
mkdirSync(outDir, { recursive: true })

const ACCENTS = {
  teal: { main: '#0E7C66', dark: '#0A5A4C', deep: '#06332B', light: '#E3F2ED', glow: '#C9E6DC' },
  emerald: { main: '#17966B', dark: '#0F6B4C', deep: '#084A35', light: '#E5F5EC', glow: '#CCEBDC' },
  sage: { main: '#5E8E72', dark: '#416A52', deep: '#2F4D3C', light: '#EBF2ED', glow: '#D4E3D8' },
  forest: { main: '#1F6F5C', dark: '#155247', deep: '#0E3D36', light: '#E3F0EB', glow: '#C8E0D6' },
}

const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${inner}</svg>`

// Shared soft drop-shadow filter
const shadowFilter = `
<filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
  <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#06332B" flood-opacity="0.18"/>
</filter>`

const bgGradients = (id, accent) => `
<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="#FBFDFC"/>
  <stop offset="1" stop-color="${accent.light}"/>
</linearGradient>`

const glowGradient = (id, accent) => `
<radialGradient id="${id}" cx="0.5" cy="0.45" r="0.55">
  <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.95"/>
  <stop offset="1" stop-color="${accent.glow}" stop-opacity="0"/>
</radialGradient>`

const bodyGradient = (id, accent) => `
<linearGradient id="${id}" x1="0" y1="0" x2="0.9" y2="1">
  <stop offset="0" stop-color="${accent.main}"/>
  <stop offset="1" stop-color="${accent.dark}"/>
</linearGradient>`

const capGradient = (id, accent) => `
<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${accent.dark}"/>
  <stop offset="1" stop-color="${accent.deep}"/>
</linearGradient>`

function leaf(x, y, scale, rot, color, opacity = 0.55) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${scale})" opacity="${opacity}">
    <path d="M0 0 C16 -12 30 -30 33 -56 C16 -58 1 -45 -3 -24 C-5 -13 -3 -4 0 0 Z" fill="${color}"/>
    <path d="M1 -2 C6 -14 13 -28 23 -46" stroke="#FFFFFF" stroke-opacity="0.4" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>`
}

function productBackdrop(accent) {
  return `
  <defs>${shadowFilter}${bgGradients('bg', accent)}${glowGradient('glow', accent)}</defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="400" cy="400" r="310" fill="url(#glow)"/>`
}

function groundShadow(cy = 590, rx = 150) {
  return `<ellipse cx="400" cy="${cy}" rx="${rx}" ry="26" fill="#06332B" opacity="0.10"/>`
}

// ── Motifs ────────────────────────────────────────────────────────────────
function motifBottle(a) {
  return `
  <g filter="url(#soft)">
    <path d="M330 250 L330 260 L470 260 L470 250 L470 300 C470 300 472 340 462 352 L338 352 C328 340 330 300 330 300 Z" fill="url(#capG)"/>
    <rect x="350" y="168" width="100" height="66" rx="12" fill="url(#capG)"/>
    <rect x="362" y="205" width="76" height="56" rx="8" fill="${a.dark}"/>
    <rect x="300" y="252" width="200" height="318" rx="40" fill="url(#body)"/>
    <rect x="300" y="330" width="200" height="152" fill="#FFFFFF" opacity="0.94"/>
    <rect x="300" y="346" width="200" height="18" fill="${a.main}"/>
    <rect x="300" y="380" width="200" height="10" fill="#D7E5DF"/>
    <rect x="300" y="400" width="130" height="10" rx="5" fill="#E4ECE8"/>
    <rect x="300" y="418" width="90" height="10" rx="5" fill="#E4ECE8"/>
    <rect x="326" y="270" width="36" height="280" rx="18" fill="#FFFFFF" opacity="0.24"/>
  </g>`
}

function motifPouch(a) {
  return `
  <g filter="url(#soft)">
    <rect x="308" y="196" width="184" height="44" rx="8" fill="url(#capG)"/>
    <path d="M308 240 L492 240 L504 574 C505 588 496 596 480 596 L320 596 C304 596 295 588 296 574 Z" fill="url(#body)"/>
    <rect x="318" y="304" width="164" height="160" rx="12" fill="#FFFFFF" opacity="0.94"/>
    <rect x="318" y="322" width="164" height="20" fill="${a.main}"/>
    <rect x="318" y="356" width="164" height="10" fill="#D7E5DF"/>
    <rect x="318" y="378" width="110" height="10" rx="5" fill="#E4ECE8"/>
    <rect x="318" y="398" width="80" height="10" rx="5" fill="#E4ECE8"/>
    <path d="M340 240 L340 256 M372 240 L372 256 M404 240 L404 256 M436 240 L436 256 M468 240 L468 256" stroke="${a.deep}" stroke-width="4" stroke-linecap="round"/>
    <rect x="330" y="260" width="30" height="250" rx="15" fill="#FFFFFF" opacity="0.16"/>
  </g>`
}

function motifJar(a) {
  return `
  <g filter="url(#soft)">
    <rect x="292" y="252" width="216" height="62" rx="14" fill="url(#capG)"/>
    <rect x="320" y="238" width="160" height="18" rx="9" fill="${a.dark}"/>
    <rect x="296" y="312" width="208" height="252" rx="44" fill="url(#body)"/>
    <rect x="296" y="376" width="208" height="136" fill="#FFFFFF" opacity="0.94"/>
    <rect x="296" y="394" width="208" height="18" fill="${a.main}"/>
    <rect x="296" y="426" width="208" height="10" fill="#D7E5DF"/>
    <rect x="296" y="448" width="132" height="10" rx="5" fill="#E4ECE8"/>
    <rect x="324" y="328" width="30" height="210" rx="15" fill="#FFFFFF" opacity="0.24"/>
  </g>`
}

function capsule(x, y, w, h, a, light = false) {
  const body = light ? a.main : a.dark
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${body}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h / 2}" rx="${h / 2}" fill="#FFFFFF" opacity="0.16"/>
    <path d="M${x + 8} ${y + h / 2} h${w - 16}" stroke="${a.deep}" stroke-opacity="0.35" stroke-width="2"/>
  </g>`
}

function motifCapsules(a) {
  return `
  <g filter="url(#soft)" transform="rotate(-18 400 400)">
    ${capsule(270, 360, 260, 92, a, false)}
    ${capsule(322, 258, 240, 88, a, true)}
    ${capsule(300, 464, 220, 80, a, true)}
  </g>`
}

function softgel(x, y, w, h, a, rot = 0) {
  return `
  <g transform="rotate(${rot} ${x} ${y})">
    <ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="url(#body)"/>
    <ellipse cx="${x}" cy="${y - h * 0.12}" rx="${w * 0.34}" ry="${h * 0.18}" fill="#FFFFFF" opacity="0.55"/>
    <ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="none" stroke="${a.deep}" stroke-opacity="0.18" stroke-width="2"/>
  </g>`
}

function motifSoftgels(a) {
  return `
  <g filter="url(#soft)">
    ${softgel(400, 330, 300, 150, a, -16)}
    ${softgel(340, 470, 210, 105, a, 10)}
    ${softgel(480, 475, 190, 95, a, -8)}
  </g>`
}

function gummy(x, y, s, a, rot = 0) {
  return `
  <g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
    <rect x="-52" y="-46" width="104" height="92" rx="40" fill="url(#body)"/>
    <rect x="-52" y="-46" width="104" height="34" rx="20" fill="#FFFFFF" opacity="0.28"/>
    <circle cx="-26" cy="-16" r="7" fill="${a.deep}" opacity="0.25"/>
    <circle cx="26" cy="-16" r="7" fill="${a.deep}" opacity="0.25"/>
  </g>`
}

function motifGummies(a) {
  return `
  <g filter="url(#soft)">
    ${gummy(320, 330, 1.15, a, -12)}
    ${gummy(480, 330, 1.15, a, 12)}
    ${gummy(400, 475, 1.2, a, 0)}
  </g>`
}

function tablet(x, y, r, a, offset = 0) {
  return `
  <g transform="translate(${x},${y})">
    <ellipse cx="0" cy="${offset}" rx="${r}" ry="${r * 0.42}" fill="${a.deep}" opacity="0.22"/>
    <circle cx="0" cy="0" r="${r}" fill="url(#body)"/>
    <circle cx="0" cy="0" r="${r * 0.62}" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="4"/>
  </g>`
}

function motifTablets(a) {
  return `
  <g filter="url(#soft)">
    ${tablet(305, 350, 92, a, 8)}
    ${tablet(490, 340, 84, a, 6)}
    ${tablet(400, 500, 104, a, 10)}
  </g>`
}

function stick(x, y, w, h, a, rot = 0) {
  return `
  <g transform="rotate(${rot} ${x} ${y})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="url(#body)"/>
    <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="5" rx="2.5" fill="#FFFFFF" opacity="0.5"/>
    <rect x="${x}" y="${y + h * 0.55}" width="${w}" height="${h * 0.45}" rx="${w / 2}" fill="${a.dark}"/>
    <rect x="${x + w * 0.5 - 8}" y="${y + h * 0.55}" width="16" height="${h * 0.45}" rx="8" fill="#FFFFFF" opacity="0.18"/>
  </g>`
}

function motifSticks(a) {
  return `
  <g filter="url(#soft)">
    ${stick(310, 300, 56, 280, a, -8)}
    ${stick(372, 280, 56, 300, a, 0)}
    ${stick(434, 300, 56, 280, a, 8)}
  </g>`
}

function motifDropper(a) {
  return `
  <g filter="url(#soft)">
    <rect x="330" y="220" width="140" height="330" rx="24" fill="url(#body)" opacity="0.9"/>
    <rect x="356" y="210" width="88" height="40" rx="10" fill="url(#capG)"/>
    <rect x="380" y="150" width="40" height="66" rx="16" fill="#4A5A54"/>
    <rect x="396" y="150" width="8" height="66" fill="#FFFFFF" opacity="0.4"/>
    <rect x="330" y="280" width="140" height="150" fill="#FFFFFF" opacity="0.92"/>
    <rect x="330" y="300" width="140" height="18" fill="${a.main}"/>
    <rect x="330" y="332" width="140" height="10" fill="#D7E5DF"/>
    <rect x="348" y="230" width="26" height="300" rx="13" fill="#FFFFFF" opacity="0.25"/>
  </g>`
}

const MOTIFS = {
  bottle: motifBottle,
  pouch: motifPouch,
  jar: motifJar,
  capsules: motifCapsules,
  softgels: motifSoftgels,
  gummies: motifGummies,
  tablets: motifTablets,
  sticks: motifSticks,
  dropper: motifDropper,
}

function productImage(accentKey, motifKey) {
  const a = ACCENTS[accentKey]
  return svg(
    800,
    800,
    `
  <defs>${shadowFilter}${bgGradients('bg', a)}${glowGradient('glow', a)}${bodyGradient('body', a)}${capGradient('cap', a)}</defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="400" cy="400" r="312" fill="url(#glow)"/>
  ${leaf(668, 126, 1, 18, a.main)}
  ${leaf(652, 142, 0.8, -8, a.dark, 0.4)}
  ${groundShadow()}
  ${MOTIFS[motifKey](a)}
  `,
  )
}

// ── Category images (800x600 collage) ─────────────────────────────────────
function categoryImage(accentKey, motifKey) {
  const a = ACCENTS[accentKey]
  return svg(
    800,
    600,
    `
  <defs>${shadowFilter}${bgGradients('bg', a)}${glowGradient('glow', a)}${bodyGradient('body', a)}${capGradient('cap', a)}</defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <circle cx="400" cy="300" r="270" fill="url(#glow)"/>
  ${leaf(684, 98, 1, 18, a.main)}
  ${leaf(668, 114, 0.8, -8, a.dark, 0.4)}
  <g transform="translate(40,-40) scale(0.9)">${MOTIFS[motifKey](a)}</g>
  `,
  )
}
// ── Hero (1600x900) ───────────────────────────────────────────────────────
function heroImage() {
  const a = ACCENTS.teal
  return svg(
    1600,
    900,
    `
  <defs>
    <linearGradient id="hbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07332A"/>
      <stop offset="1" stop-color="#0B5A4E"/>
    </linearGradient>
    <radialGradient id="hglow" cx="0.82" cy="0.28" r="0.7">
      <stop offset="0" stop-color="#22A47E" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#07332A" stop-opacity="0"/>
    </radialGradient>
    ${bodyGradient('body', a)}
    ${capGradient('cap', a)}
    ${shadowFilter}
  </defs>
  <rect width="1600" height="900" fill="url(#hbg)"/>
  <circle cx="1320" cy="250" r="380" fill="url(#hglow)"/>
  <circle cx="1280" cy="540" r="260" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
  <circle cx="1360" cy="220" r="180" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="2"/>
  ${leaf(1350, 720, 2.4, 20, '#2FA67F')}
  ${leaf(1460, 680, 1.6, -12, '#1B7A5F', 0.5)}
  ${leaf(1180, 820, 1.8, -20, '#1B7A5F', 0.4)}
  <g transform="translate(980,190) scale(0.95)" filter="url(#soft)">
    ${capsule(40, 180, 320, 110, a, true)}
    ${capsule(110, 60, 280, 100, a, false)}
    ${softgel(170, 340, 300, 150, a, -16)}
    ${softgel(330, 500, 220, 110, a, 10)}
    ${tablet(560, 220, 90, a, 6)}
    ${tablet(640, 360, 70, a, 4)}
  </g>
  `,
  )
}

// ── Factory (1200x900) ────────────────────────────────────────────────────
function factoryImage() {
  const a = ACCENTS.teal
  return svg(
    1200,
    900,
    `
  <defs>
    <linearGradient id="fbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F3F9F6"/>
      <stop offset="1" stop-color="#E0EFE9"/>
    </linearGradient>
    ${bodyGradient('body', a)}
    ${capGradient('cap', a)}
    ${shadowFilter}
  </defs>
  <rect width="1200" height="900" fill="url(#fbg)"/>
  <rect x="0" y="760" width="1200" height="140" fill="#0B5A4E"/>
  <rect x="0" y="740" width="1200" height="20" fill="#07332A"/>
  <!-- building -->
  <rect x="110" y="250" width="980" height="490" rx="16" fill="#FFFFFF"/>
  <rect x="110" y="250" width="980" height="18" rx="9" fill="${a.main}"/>
  <rect x="110" y="250" width="980" height="490" rx="16" fill="none" stroke="#CFE3DA" stroke-width="3"/>
  <!-- roof -->
  <path d="M90 250 L600 150 L1110 250 Z" fill="${a.main}"/>
  <path d="M90 250 L600 150 L1110 250 Z" fill="none" stroke="${a.dark}" stroke-width="3"/>
  <!-- windows -->
  <g fill="#EAF5F0" stroke="#CFE3DA" stroke-width="3">
    <rect x="170" y="310" width="180" height="140" rx="10"/>
    <rect x="410" y="310" width="180" height="140" rx="10"/>
    <rect x="650" y="310" width="180" height="140" rx="10"/>
    <rect x="890" y="310" width="140" height="140" rx="10"/>
  </g>
  <!-- interior equipment: capsule filling machine -->
  <g>
    <rect x="210" y="500" width="260" height="170" rx="14" fill="#FFFFFF" stroke="#CFE3DA" stroke-width="3"/>
    <rect x="240" y="530" width="120" height="70" rx="8" fill="${a.light}"/>
    <rect x="400" y="530" width="50" height="70" rx="8" fill="${a.light}"/>
    <circle cx="275" cy="565" r="16" fill="${a.main}"/>
    <circle cx="315" cy="565" r="16" fill="${a.main}"/>
    <circle cx="355" cy="565" r="16" fill="${a.main}"/>
    <rect x="230" y="520" width="200" height="10" rx="5" fill="${a.main}"/>
  </g>
  <!-- conveyor -->
  <g>
    <rect x="500" y="620" width="340" height="16" rx="8" fill="${a.dark}"/>
    <circle cx="530" cy="628" r="10" fill="${a.deep}"/>
    <circle cx="800" cy="628" r="10" fill="${a.deep}"/>
    <rect x="560" y="580" width="200" height="40" rx="10" fill="#FFFFFF" stroke="#CFE3DA" stroke-width="3"/>
  </g>
  <!-- lab worker -->
  <g>
    <circle cx="720" cy="470" r="34" fill="#F1D9BE"/>
    <path d="M690 470 C690 440 750 440 750 470 L750 500 L690 500 Z" fill="#0B5A4E"/>
    <rect x="684" y="500" width="72" height="130" rx="12" fill="#FFFFFF" stroke="#CFE3DA" stroke-width="3"/>
    <rect x="684" y="560" width="72" height="20" fill="${a.main}"/>
    <rect x="668" y="510" width="18" height="80" rx="9" fill="#FFFFFF" stroke="#CFE3DA" stroke-width="3"/>
    <rect x="754" y="510" width="18" height="80" rx="9" fill="#FFFFFF" stroke="#CFE3DA" stroke-width="3"/>
    <rect x="706" y="510" width="28" height="10" rx="5" fill="#4A5A54"/>
  </g>
  ${leaf(1060, 130, 1.6, 18, a.main)}
  ${leaf(80, 130, 1.4, -18, a.dark, 0.4)}
  `,
  )
}

// ── Write all assets ──────────────────────────────────────────────────────
const products = [
  ['marine-collagen', 'pouch', 'teal'],
  ['glutathione', 'capsules', 'emerald'],
  ['whitening', 'softgels', 'teal'],
  ['beauty-gummies', 'gummies', 'sage'],
  ['menopause', 'bottle', 'forest'],
  ['probiotics', 'capsules', 'emerald'],
  ['inositol', 'pouch', 'sage'],
  ['women-gummies', 'gummies', 'teal'],
  ['vitamin-c', 'tablets', 'teal'],
  ['magnesium', 'jar', 'teal'],
  ['calcium-d3', 'softgels', 'forest'],
  ['multivitamin', 'capsules', 'emerald'],
  ['whey-protein', 'pouch', 'teal'],
  ['bhb', 'pouch', 'forest'],
  ['muscle-support', 'bottle', 'emerald'],
  ['pre-workout', 'sticks', 'teal'],
]

const categories = [
  ['beauty', 'teal', 'softgels'],
  ['womens-health', 'sage', 'gummies'],
  ['vitamins', 'forest', 'tablets'],
  ['sports', 'emerald', 'pouch'],
]

for (const [id, motif, accent] of products) {
  writeFileSync(join(outDir, `product-${id}.svg`), productImage(accent, motif))
}
for (const [id, accent, motif] of categories) {
  writeFileSync(join(outDir, `category-${id}.svg`), categoryImage(accent, motif))
}
writeFileSync(join(outDir, 'hero.svg'), heroImage())
writeFileSync(join(outDir, 'factory.svg'), factoryImage())

console.log('✓ Generated', products.length + categories.length + 2, 'SVG assets in', outDir)

