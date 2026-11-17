# Shop Republic

A static shop — plain HTML, CSS and JavaScript. No framework, no build step, no backend.
Everything is driven by two JSON files, so adding a product or a banner never means editing HTML.

```
index.html          Home: banner slider + the two category cards
products.html       Grid, filtered by ?category= and ?sub=
product.html        Single product, reads ?id= from the URL
404.html            Not-found page (self-contained styles)
css/style.css       All shared styling
js/site.js          Config + helpers  <- WhatsApp number lives here
js/slider.js        Banner slider
js/products.js      Listing + filters
js/product.js       Product detail
data/banners.js     One entry per hero banner
data/products.js    One entry per product
img/                All imagery
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository (the files must sit at the **repo root** —
   `index.html` should be the first thing you see in the repo, not inside a subfolder).
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to **`/ (root)`**, then press **Save**.
5. Wait for the green tick on the Actions/Pages run, then open
   `https://<username>.github.io/<repo-name>/`.

### Things that break on a project subpath — already handled

The site lives at `/<repo-name>/`, not at `/`. All of these were dealt with:

- **No leading-slash paths anywhere.** Every `src`/`href` is relative (`css/style.css`,
  not `/css/style.css`). A leading slash would resolve to the domain root and 404.
  All 43 references were verified to resolve correctly under a subpath.
- **`404.html` is special.** GitHub Pages serves it for *any* missing URL, including deep
  ones like `/repo/a/b/typo`. Relative links would then resolve against the wrong folder,
  so its CSS is inlined and its links are rewritten to absolute paths by a small script.
  If you publish to a **user site** (`username.github.io`) or a custom domain at the domain
  root, open `404.html` and set `SITE_BASE = '/'`.
- **Case sensitivity.** GitHub Pages serves from a case-sensitive filesystem, while Windows
  is not. `banner.JPG` and `banner.jpg` are different files there and identical locally.
  Every filename here is lowercase with no spaces, so this cannot bite you. Keep it that
  way when you add images — avoid `IMG_1234.PNG` and `My Photo (1).jpeg`.
- **`.nojekyll`** stops GitHub from running the files through Jekyll, which would otherwise
  ignore any file or folder beginning with an underscore.

### Testing locally

Just double-click `index.html`. It works straight from your hard drive.

The shop data lives in `data/products.js` and `data/banners.js`, which the pages load
with ordinary `<script>` tags. That is deliberate: a browser refuses to `fetch()` a
`.json` file over `file://`, which is what caused the old
"We could not load the collection" error. Script files have no such restriction, so the
same files work locally and on GitHub Pages, with no server and no build step.

If you prefer a server anyway (closer to the real thing, and lets you test the 404 page):

```bash
cd fashion
python -m http.server 8000
# then visit http://localhost:8000/
```

## Adding a banner

Drop the image into `img/banners/`, then add one entry to the list in `data/banners.js`:

```js
{
  "image": "img/banners/banner-12.jpg",
  "alt": "Describe what is actually in the photo, for screen readers.",
  "focus": "center 35%",
  "link": "products.html?category=men"
}
```

`focus` is optional and sets `object-position`, which decides what stays in frame when the
photo is cropped — nudge it if a face gets cut off. `link` is optional too.

Keep banners around 1920px on the long edge and under ~300 KB.

## Adding a product

Drop the photo into `img/products/<category>/<subcategory>/`, then add one entry to the
list in `data/products.js`:

```js
{
  "id": "men-zip-polo-olive",
  "name": "Olive zip-neck polo",
  "category": "men",
  "subcategory": "zip-polo",
  "price": 45000,
  "currency": "UGX",
  "description": "Short paragraph about the piece.",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Olive"],
  "images": ["img/products/men/zip-polo/zip-polo-olive.jpg"],
  "sourceUrl": null,
  "inStock": true
}
```

- `id` must be unique, lowercase, no spaces. It becomes the URL: `product.html?id=<id>`.
- `category` must be `ladies` or `men`.
- A **new `subcategory`** value automatically creates a new filter button — no code changes.
- `price: null` renders as **"Price on request"**.
- `price: 45000` renders as **USh 45,000**. The currency is Ugandan shilling (`UGX`)
  and is set once in `js/site.js`; you only need `currency` on a product that differs.
- `images` can hold several paths; the extras become gallery thumbnails.
- If `images` is empty, a neutral placeholder is shown instead of a broken image.

## Setting the WhatsApp number

One place only — `js/site.js`:

```js
window.SHOP = {
  name: 'Shop Republic',
  whatsappNumber: '256712345678',  // international format, digits only
  defaultCurrency: 'UGX'
};
```

Until a real number is set, the order button on each product page stays disabled with a
note explaining why, so nothing silently links to a dead chat.

## What is still missing

Everything below is content only — the site works and is deployable as-is.

### Blocking a real launch

- **WhatsApp number** — `js/site.js`, `whatsappNumber`. Still `000000000000`, so the
  order button renders disabled with an explanatory note. Digits only, country code
  first, no `+` or spaces.
- ~~Currency~~ — done: `UGX`, formatted for Uganda (`USh 120,000`).
- **Prices** — all 26 products have `price: null` and display "Price on request".
  Set `price` and `currency` per product in `data/products.js`.

### Names and descriptions still to come

| Products | Count | Needed |
|---|---|---|
| Men's zip-neck polos | 5 | caption (name, description, sizes, colour list) |
| Ladies ribbed collared tops | 4 | caption (name, description, sizes, colour list) |
| Ladies crop tees | 3 | caption (name, description, sizes, colour list) |

Until then these show a `TODO — …` name describing the garment and its colour.

### Photos still to come

- **Elegant Linens shirt — Blue.** The caption lists blue and black; black, white and
  burgundy have photos, blue does not. No blue garment exists anywhere in
  `img/products/`. Add `img/products/ladies/linen-shirt/linen-shirt-blue.jpg` and a
  matching entry in `data/products.js`.

### Optional

- `sourceUrl` is `null` on every product. Only needed if you want to link out to an
  original listing.
