import json, re, os

base = r'C:\Users\20461\Documents\ChatGPT\产品页'
data = json.load(open(os.path.join(base, '.excel-mapped.json'), encoding='utf-8'))

TYPE_MAP = {
    'Gummies': ('gummies', 'Gummies'),
    'Capsules': ('capsules', 'Capsules'),
    'Powder': ('powder', 'Powder'),
    'Tablets': ('tablets', 'Tablets'),
    'Softgels': ('softgels', 'Softgels'),
    'Drink': ('drinks', 'Drinks'),
    'Syrup': ('syrups', 'Syrups'),
    'Effervescent Tablet Series': ('effervescent', 'Effervescent Tablets'),
    'Chocolate': ('chocolate', 'Chocolates'),
    'Supreme Supplement Series': ('supreme', 'Supreme Series'),
}
FORM_MAP = {
    'gummies': ['Gummy'], 'capsules': ['Capsule'], 'powder': ['Powder'],
    'tablets': ['Tablet'], 'softgels': ['Softgel'], 'drinks': ['Liquid', 'Bottle'],
    'syrups': ['Syrup', 'Liquid'], 'effervescent': ['Effervescent Tablet', 'Tablet'],
    'chocolate': ['Chocolate'], 'supreme': ['Softgel', 'Capsule'], 'others': ['Custom'],
}

def clean_text(s):
    return re.sub(r'\s+', ' ', (s or '')).strip()

def clean_benefits(func):
    lines = []
    for raw in func.split('\n'):
        s = raw.strip().strip('-*• ').strip()
        if not s:
            continue
        for sep in (' – ', ' — ', ' - '):
            if sep in s:
                s = s.split(sep)[0].strip()
                break
        s = clean_text(s)
        if s and s not in lines:
            lines.append(s[:74])
    return lines[:5]

def make_id(code):
    s = re.sub(r'[^A-Za-z0-9_-]+', '-', code).strip('-').lower()
    return s or code.lower()

products = []
seen_ids = set()
for p in data:
    code = p['code']
    t = p['type'] or ''
    cat_id, _ = TYPE_MAP.get(t, ('others', 'Others'))
    cid = make_id(code); base_id = cid; k = 2
    while cid in seen_ids:
        cid = f'{base_id}-{k}'; k += 1
    seen_ids.add(cid)
    benefits = clean_benefits(p['function']) or ['OEM / ODM Custom Formula Available']
    spec = clean_text(p['spec']).replace('\n', ' · ')
    packaging = ' / '.join([x for x in [clean_text(p['net']), clean_text(p['gross']), clean_text(p['ctn'])] if x])
    products.append({
        'id': cid, 'code': code,
        'name': clean_text(p['name']) or code,
        'category': cat_id,
        'image': f"/images/products/product-{code}.webp",
        'shortDescription': benefits[0],
        'tags': ['OEM Available', 'Private Label', 'Custom Formula'],
        'benefits': benefits,
        'forms': FORM_MAP.get(cat_id, ['Custom']),
        'oem': True,
        'features': ['Factory Direct', 'Low MOQ', 'Custom Packaging'],
        'spec': spec,
        'packaging': packaging,
    })

cat_order = ['gummies','capsules','powder','tablets','softgels','drinks','syrups','effervescent','supreme','chocolate','others']
cat_labels = {'gummies':'Gummies','capsules':'Capsules','powder':'Powder','tablets':'Tablets','softgels':'Softgels','drinks':'Drinks','syrups':'Syrups','effervescent':'Effervescent Tablets','supreme':'Supreme Series','chocolate':'Chocolates','others':'Others'}
cat_counts = {}; cat_first_image = {}; cat_items = {}
for p in products:
    c = p['category']
    cat_counts[c] = cat_counts.get(c, 0) + 1
    cat_first_image.setdefault(c, p['image'])
    cat_items.setdefault(c, [])
    if len(cat_items[c]) < 4:
        cat_items[c].append(p['name'])

categories = []
for c in cat_order:
    if c not in cat_counts:
        continue
    categories.append({'id': c, 'name': cat_labels[c], 'tagline': f"{cat_counts[c]} products · OEM / ODM ready", 'image': cat_first_image[c], 'items': cat_items[c]})

out = ['// AUTO-GENERATED from Product Information产品信息汇总表2026.0708.xlsx', '// Regenerate with: python scripts/generate-products.py', '']
out.append('export const PRODUCTS = [')
for p in products:
    out.append('  {')
    out.append(f"    id: {json.dumps(p['id'])}, code: {json.dumps(p['code'])}, name: {json.dumps(p['name'])}, category: {json.dumps(p['category'])}, image: {json.dumps(p['image'])},")
    out.append(f"    shortDescription: {json.dumps(p['shortDescription'])}, tags: {json.dumps(p['tags'])}, benefits: {json.dumps(p['benefits'])}, forms: {json.dumps(p['forms'])}, oem: true,")
    out.append(f"    features: {json.dumps(p['features'])}, spec: {json.dumps(p['spec'])}, packaging: {json.dumps(p['packaging'])},")
    out.append('  },')
out.append(']')
out.append('')
out.append('export const CATEGORY_FILTERS = [')
out.append("  { id: 'all', label: 'All Products' },")
for c in categories:
    out.append(f"  {{ id: {json.dumps(c['id'])}, label: {json.dumps(c['name'])} }},")
out.append(']')
out.append('')
out.append('export function getProduct(id) { return PRODUCTS.find((p) => p.id === id) }')
out.append('')
open(os.path.join(base, 'src', 'data', 'products.js'), 'w', encoding='utf-8').write('\n'.join(out))

cout = ['export const CATEGORIES = [']
for c in categories:
    cout.append('  {')
    cout.append(f"    id: {json.dumps(c['id'])}, name: {json.dumps(c['name'])}, tagline: {json.dumps(c['tagline'])}, image: {json.dumps(c['image'])}, items: {json.dumps(c['items'])},")
    cout.append('  },')
cout.append(']')
cout.append('')
cout.append('export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))')
cout.append('export function categoryName(id) { return CATEGORY_MAP[id]?.name ?? id }')
cout.append('')
open(os.path.join(base, 'src', 'data', 'categories.js'), 'w', encoding='utf-8').write('\n'.join(cout))

print('OK products', len(products), 'categories', len(categories))
