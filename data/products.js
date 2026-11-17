/* ==========================================================================
   Shop Republic - THE PRODUCT LIST
   This is the only file you edit to add, remove or change a product.
   No HTML to touch, no build step, no server needed.

   Why .js and not .json: browsers refuse to fetch() a .json file when you
   open the site by double-clicking index.html (the file:// security rule).
   A <script> file is allowed, so the shop works both locally and on
   GitHub Pages. The contents below are ordinary JSON.

   FIELDS
     id          unique, lowercase, no spaces - becomes product.html?id=...
     name        shown on the card and the detail page
     category    "ladies" or "men"
     subcategory free text, becomes a filter button automatically
     price       a number, or null to show "Price on request"
     currency    e.g. "UGX", or null to use the shop default
     description shown on the detail page
     sizes       [] of strings
     colors      [] of strings - put the colour in the photo FIRST
     images      [] of paths, relative, first one is the main photo
     sourceUrl   optional link to an original listing, or null
     inStock     true, or false to show a "Sold out" badge
   ========================================================================== */
window.DATA = window.DATA || {};
window.DATA.products = [
  {
    "id": "men-striped-polo-grey",
    "name": "Striped polo shirt — Grey",
    "category": "men",
    "subcategory": "striped-polo",
    "price": null,
    "currency": null,
    "description": "Available in colors black, grey, purple, blue, olive green and orange, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Grey",
      "Black",
      "Purple",
      "Blue",
      "Olive green",
      "Orange"
    ],
    "images": [
      "img/products/men/striped-polo/striped-polo-grey.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-striped-polo-navy",
    "name": "Striped polo shirt — Blue",
    "category": "men",
    "subcategory": "striped-polo",
    "price": null,
    "currency": null,
    "description": "Available in colors black, grey, purple, blue, olive green and orange, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Blue",
      "Black",
      "Grey",
      "Purple",
      "Olive green",
      "Orange"
    ],
    "images": [
      "img/products/men/striped-polo/striped-polo-navy.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-striped-polo-sage",
    "name": "Striped polo shirt — Olive green",
    "category": "men",
    "subcategory": "striped-polo",
    "price": null,
    "currency": null,
    "description": "Available in colors black, grey, purple, blue, olive green and orange, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive green",
      "Black",
      "Grey",
      "Purple",
      "Blue",
      "Orange"
    ],
    "images": [
      "img/products/men/striped-polo/striped-polo-sage.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-striped-polo-tan",
    "name": "Striped polo shirt — Orange",
    "category": "men",
    "subcategory": "striped-polo",
    "price": null,
    "currency": null,
    "description": "Available in colors black, grey, purple, blue, olive green and orange, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Orange",
      "Black",
      "Grey",
      "Purple",
      "Blue",
      "Olive green"
    ],
    "images": [
      "img/products/men/striped-polo/striped-polo-tan.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-camp-shirt-cream",
    "name": "Unique Cuban shirt — Cream",
    "category": "men",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black and white, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Cream",
      "Sage green",
      "Burgundy",
      "Red",
      "Black",
      "White"
    ],
    "images": [
      "img/products/men/short-sleeve/camp-shirt-cream.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-camp-shirt-teal",
    "name": "Unique Cuban shirt — Sage green",
    "category": "men",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black and white, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Sage green",
      "Cream",
      "Burgundy",
      "Red",
      "Black",
      "White"
    ],
    "images": [
      "img/products/men/short-sleeve/camp-shirt-teal.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-camp-shirt-burgundy",
    "name": "Unique Cuban shirt — Burgundy",
    "category": "men",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black and white, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Burgundy",
      "Cream",
      "Sage green",
      "Red",
      "Black",
      "White"
    ],
    "images": [
      "img/products/men/short-sleeve/camp-shirt-burgundy.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-camp-shirt-black",
    "name": "Unique Cuban shirt — Black",
    "category": "men",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black and white, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Cream",
      "Sage green",
      "Burgundy",
      "Red",
      "White"
    ],
    "images": [
      "img/products/men/short-sleeve/camp-shirt-black.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-camp-shirt-white",
    "name": "Unique Cuban shirt — White",
    "category": "men",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black and white, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Cream",
      "Sage green",
      "Burgundy",
      "Red",
      "Black"
    ],
    "images": [
      "img/products/men/short-sleeve/camp-shirt-white.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-zip-polo-black",
    "name": "TODO — Black zip-neck polo",
    "category": "men",
    "subcategory": "zip-polo",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Black"
    ],
    "images": [
      "img/products/men/zip-polo/zip-polo-black.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-zip-polo-navy",
    "name": "TODO — Navy zip-neck polo",
    "category": "men",
    "subcategory": "zip-polo",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Navy"
    ],
    "images": [
      "img/products/men/zip-polo/zip-polo-navy.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-zip-polo-burgundy",
    "name": "TODO — Burgundy zip-neck polo",
    "category": "men",
    "subcategory": "zip-polo",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Burgundy"
    ],
    "images": [
      "img/products/men/zip-polo/zip-polo-burgundy.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-zip-polo-sage",
    "name": "TODO — Sage zip-neck polo",
    "category": "men",
    "subcategory": "zip-polo",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Sage green"
    ],
    "images": [
      "img/products/men/zip-polo/zip-polo-sage.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "men-zip-polo-brown",
    "name": "TODO — Brown zip-neck polo",
    "category": "men",
    "subcategory": "zip-polo",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Brown"
    ],
    "images": [
      "img/products/men/zip-polo/zip-polo-brown.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-cuban-shirt-white",
    "name": "Unique Cuban crop shirt — White",
    "category": "ladies",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black, white and pink, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Cream",
      "Sage green",
      "Burgundy",
      "Red",
      "Black",
      "Pink"
    ],
    "images": [
      "img/products/ladies/short-sleeve/cuban-shirt-white.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-cuban-shirt-pink",
    "name": "Unique Cuban crop shirt — Pink",
    "category": "ladies",
    "subcategory": "short-sleeve",
    "price": null,
    "currency": null,
    "description": "Available in colors cream, sage green, burgundy, red, black, white and pink, in sizes S, M, L and XL.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Pink",
      "Cream",
      "Sage green",
      "Burgundy",
      "Red",
      "Black",
      "White"
    ],
    "images": [
      "img/products/ladies/short-sleeve/cuban-shirt-pink.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-linen-shirt-white",
    "name": "Elegant Linens shirt — White",
    "category": "ladies",
    "subcategory": "linen-shirt",
    "price": null,
    "currency": null,
    "description": "Available in colors blue, black, white and burgundy, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Blue",
      "Black",
      "Burgundy"
    ],
    "images": [
      "img/products/ladies/linen-shirt/linen-shirt-white.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-linen-shirt-black",
    "name": "Elegant Linens shirt — Black",
    "category": "ladies",
    "subcategory": "linen-shirt",
    "price": null,
    "currency": null,
    "description": "Available in colors blue, black, white and burgundy, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Blue",
      "White",
      "Burgundy"
    ],
    "images": [
      "img/products/ladies/linen-shirt/linen-shirt-black.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-linen-shirt-burgundy",
    "name": "Elegant Linens shirt — Burgundy",
    "category": "ladies",
    "subcategory": "linen-shirt",
    "price": null,
    "currency": null,
    "description": "Available in colors blue, black, white and burgundy, in sizes M, L and XL.",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Burgundy",
      "Blue",
      "Black",
      "White"
    ],
    "images": [
      "img/products/ladies/linen-shirt/linen-shirt-burgundy.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-ribbed-top-black",
    "name": "TODO — Black ribbed collared top",
    "category": "ladies",
    "subcategory": "ribbed-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Black"
    ],
    "images": [
      "img/products/ladies/ribbed-top/ribbed-top-black.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-ribbed-top-white",
    "name": "TODO — White ribbed collared top",
    "category": "ladies",
    "subcategory": "ribbed-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "White"
    ],
    "images": [
      "img/products/ladies/ribbed-top/ribbed-top-white.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-ribbed-top-green",
    "name": "TODO — Green ribbed collared top",
    "category": "ladies",
    "subcategory": "ribbed-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Green"
    ],
    "images": [
      "img/products/ladies/ribbed-top/ribbed-top-green.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-ribbed-top-brown",
    "name": "TODO — Brown ribbed collared top",
    "category": "ladies",
    "subcategory": "ribbed-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Brown"
    ],
    "images": [
      "img/products/ladies/ribbed-top/ribbed-top-brown.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-crop-tee-brasil-red",
    "name": "TODO — Red Brasil crop tee",
    "category": "ladies",
    "subcategory": "crop-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Red"
    ],
    "images": [
      "img/products/ladies/crop-top/crop-tee-brasil-red.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-crop-tee-brasil-yellow",
    "name": "TODO — Yellow Brasil crop tee",
    "category": "ladies",
    "subcategory": "crop-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Yellow"
    ],
    "images": [
      "img/products/ladies/crop-top/crop-tee-brasil-yellow.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  },
  {
    "id": "ladies-crop-tee-navy-star",
    "name": "TODO — Navy star crop tee",
    "category": "ladies",
    "subcategory": "crop-top",
    "price": null,
    "currency": null,
    "description": "",
    "sizes": [],
    "colors": [
      "Navy"
    ],
    "images": [
      "img/products/ladies/crop-top/crop-tee-navy-star.jpg"
    ],
    "sourceUrl": null,
    "inStock": true
  }
];
