# Shield House — Technical README

Static React + Vite site. No backend, no database, no admin panel. Product content is
bundled at build time and served from Vercel's CDN.

```
Customer     browser ──► Vercel CDN (static HTML + JS + WebP)
Enquiries    browser ──► wa.me deep link ──► WhatsApp
Publishing   edit 2 things ──► git push ──► Vercel rebuild ──► live (~1 min)
```

"Edit 2 things" means **one JSON file and two image files**. That is the whole publishing
process, and the rest of this document is about doing it correctly.

---

## Adding a new shield

Everything you touch lives in exactly two places:

| What | Where |
|---|---|
| The product record | `src/data/products.json` |
| The two images | `public/products/` |

### Step 1 — pick the slug

The slug is the product's identity and its URL. Existing products use zero-padded numbers
`01` through `30`, so the next one is `31`.

```
slug "31"  ──►  https://your-site.com/shop/31
```

Rules: must be unique, and may only contain letters, numbers and dashes. Once the product is
live, **never change the slug** — it breaks every link and every WhatsApp enquiry that
referenced it.

### Step 2 — make the two images

The site needs two WebP files per product, at two sizes, named after the slug:

| File | Size | Used by |
|---|---|---|
| `public/products/31-sm.webp` | 400px | Shop grid |
| `public/products/31.webp` | 800px | Product detail page |

Put your source photo in the project root as `new-photo.jpg`, then run this from the project
root. It writes both files directly into `public/products/`:

```bash
python3 - <<'PY'
from PIL import Image

SRC  = "new-photo.jpg"   # your source photo
SLUG = "31"              # must match the slug in products.json

im = Image.open(SRC).convert("RGB")
for size, tag in ((800, ""), (400, "-sm")):
    out = im.copy()
    out.thumbnail((size, size), Image.LANCZOS)
    path = f"public/products/{SLUG}{tag}.webp"
    out.save(path, "WEBP", quality=82, method=6)
    print(f"wrote {path}  {out.size}")
PY
```

This needs Pillow (`pip install pillow`) — already installed on the current dev machine.
ImageMagick (`magick -resize 800x800 -quality 82 …`) does the same job but is **not**
installed here, so the snippet above is the path of least resistance.

Do not skip the conversion and commit a raw JPEG. Source photos from the shop are typically
1200px at 300 DPI (~100 KB each); the site never displays them larger than 260px in the grid
or 420px on the detail page. All 30 current products together are only 1.1 MB because they
are correctly sized.

### Step 3 — add the record

Open `src/data/products.json` and append an object to the array:

```json
{
  "slug": "31",
  "name": "Wooden Crest",
  "description": "",
  "details": "Premium MDF Deco Polish Mate Finish Colour Black Print On Golden Acrylic Size 8x10 Inches",
  "customization_option": "",
  "image": "/products/31.webp",
  "thumb": "/products/31-sm.webp",
  "is_active": true
}
```

Note the image paths are **absolute from the site root** and start with `/products/` — not
`/public/products/`. `public/` is the build input directory; it does not appear in URLs.

**Position in the array is the position in the shop grid.** Append to the end for the newest
product to appear last; insert at the top to feature it first.

### Step 4 — check it locally

```bash
npm run dev
```

Open http://localhost:5173/shop and confirm the new card appears with its image, then click
through to http://localhost:5173/shop/31 and check the detail text and the WhatsApp button.
Vite picks up JSON edits automatically; restart the dev server if it does not.

### Step 5 — publish

```bash
git add src/data/products.json public/products/31.webp public/products/31-sm.webp
git commit -m "Add product 31 (Wooden Crest)"
git push
```

Vercel rebuilds on push. The change is live in about a minute.

---

## Field reference

Read this before writing content — one of these fields does nothing.

| Field | Required | Where it appears |
|---|---|---|
| `slug` | yes | The URL (`/shop/31`), and shown as `Shield ID: 31` on the detail page (uppercased) |
| `name` | yes | Shop grid card, detail page heading, browser tab context |
| `details` | yes | The specification paragraph on the detail page |
| `image` | yes | Detail page photo (800px file) |
| `thumb` | recommended | Shop grid photo (400px file). If omitted, the grid falls back to `image`, which wastes bandwidth |
| `customization_option` | no | Detail page. **If empty, the page shows "Custom options available on request."** — all 30 current products leave it empty and rely on that fallback |
| `is_active` | no | Visibility. **Only the literal value `false` hides a product.** `true`, or omitting the field entirely, means visible |
| `description` | no | **Nothing. It is stored but never rendered on the site.** It is a leftover from the old Django backend |

That last row matters: don't spend time writing a `description`. If you want text visible to
customers, it goes in `details`.

### The WhatsApp message

The detail page's WhatsApp button builds this message from the record:

```
Hello, I want to contact you about this product.
Shield ID: 31
Product URL: https://your-site.com/shop/31
```

The number lives in one place: `whatsappNumber` in `src/lib/contact.js`.

---

## Other common edits

| Task | Do this |
|---|---|
| Change a price/spec | Edit `details` on that record |
| Rename a product | Edit `name`. Leave `slug` alone |
| Hide temporarily | Set `"is_active": false`. Record and images stay in the repo |
| Delete permanently | Remove the object from the array **and** delete both `.webp` files |
| Reorder the grid | Move the object up or down in the array |
| Change the contact number | `whatsappNumber` in `src/lib/contact.js` |
| Change the FAQ questions | `commonQuestions` array at the top of `src/pages/ContactPage.jsx` |
| Change shop address / hours | `contactDetails` array in `src/pages/ContactPage.jsx` |

---

## File map

```
shield-frontend/
├── public/
│   ├── products/              # ← product images live here (60 files: 30 × 2 sizes)
│   ├── videos/
│   │   └── shield-house.mp4   # home page hero video — 28 MB, see "Known issues"
│   └── main_logo.png          # header logo
├── src/
│   ├── data/
│   │   └── products.json      # ← the catalogue. This IS the database
│   ├── lib/
│   │   ├── api.js             # reads products.json, filters is_active. No network calls
│   │   └── contact.js         # WhatsApp number + deep-link builder
│   ├── pages/
│   │   ├── HomePage.jsx       # hero video, counters, embeds the shop grid
│   │   ├── ShopPage.jsx       # the grid. Exports ShopSection, reused by HomePage
│   │   ├── ProductDetailsPage.jsx  # /shop/:slug
│   │   ├── ContactPage.jsx    # info cards + FAQ questions + free-text query
│   │   └── AboutPage.jsx
│   ├── components/
│   │   ├── MainLayout.jsx     # header, nav items, footer wrapper
│   │   └── Footer.jsx
│   ├── theme.js               # MUI theme: gold palette, gradients, shadows
│   ├── App.jsx                # routes
│   └── main.jsx               # entry point
├── vercel.json                # SPA rewrite: all paths → / so /shop/31 works on direct visit
└── vite.config.js
```

There is no `.env` file and no environment variables. Nothing to configure.

## How the data layer works

`src/lib/api.js` is the entire data layer — 17 lines:

```js
import productsData from "../data/products.json";

const products = productsData.filter((product) => product.is_active !== false);

export function getProducts() { return products; }
export function getProduct(slug) { return products.find((p) => p.slug === slug) || null; }
```

Both are **synchronous**. Pages call them directly during render — there is no `useEffect`,
no loading state, no error state, no cold start. `getProduct` returning `null` makes
`ProductDetailsPage` redirect to `/shop`, which is how unknown slugs are handled.

## Commands

```bash
npm install          # once, after cloning
npm run dev          # dev server at http://localhost:5173 (HMR)
npm run build        # production build into dist/
npm run preview      # serve the built dist/ locally
```

`npm run preview` defaults to port 4173. On the current dev machine that port is taken by an
unrelated app, so Vite falls back to 4174 — read the URL it prints.

## Deployment

Vercel, connected to the GitHub repo. Every push to `main` triggers a rebuild. No environment
variables, no build settings to configure — Vite is auto-detected.

## Verification checklist

Before pushing a new product:

- [ ] Both `.webp` files exist in `public/products/` and are named exactly after the slug
- [ ] `image` and `thumb` paths start with `/products/` (not `/public/products/`)
- [ ] The slug is unique and appears nowhere else in `products.json`
- [ ] `products.json` is still valid JSON — `python3 -m json.tool src/data/products.json > /dev/null`
- [ ] `npm run build` completes
- [ ] The card appears at `/shop` and the detail page loads at `/shop/<slug>`

## Troubleshooting

**Product does not appear.** Check `is_active` is not `false`, and that the object is
actually inside the array. Then confirm the JSON parses:

```bash
python3 -m json.tool src/data/products.json > /dev/null && echo "valid JSON"
```

**Broken image.** The path in `products.json` must start with `/products/` and match the
filename exactly, including case. `31.WEBP` will not match `/products/31.webp`.

**Grid image looks soft or loads slowly.** `thumb` is probably missing, so the grid is
loading the 800px `image` instead, or the file was committed as a resized JPEG rather than
WebP.

**Detail page shows "Custom options available on request."** That is the intended fallback
for an empty `customization_option`, not a bug.

**Build fails.**

```bash
rm -rf node_modules
npm install
npm run build
```

## Known issues

**`public/videos/shield-house.mp4` is 28 MB** and autoplays on the home page. It is roughly
25× the size of all 30 product images combined and is by far the largest thing the site
serves. Compressing it, or adding `preload="none"` with a poster image in
`src/pages/HomePage.jsx`, would improve load time more than any other single change.

**Bundle is ~505 KB (156 KB gzipped)**, mostly MUI. Route-level `React.lazy()` would split
it, but it is not currently a problem.

**There is no "Shop" link in the header nav** (`navItems` in `src/components/MainLayout.jsx`
lists Home, Contact, About). The shop is reached from the home page's "Explore Shop" button
and the grid embedded there. Add it to `navItems` if you want it in the header.

## License

MIT
