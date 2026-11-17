/* ==========================================================================
   Shop Republic - HOMEPAGE BANNER SLIDER
   Every entry becomes one slide, in this order. Drop a new photo into
   img/banners/ and add a line here.

     image  path to the photo, relative
     alt    description for screen readers and for when the image fails
     focus  object-position, e.g. "center 30%" - moves the visible crop
     link   where the slide goes when clicked, or null for no link

   Written as .js rather than .json so the slider also works when you open
   index.html straight from your hard drive. The contents are ordinary JSON.
   ========================================================================== */
window.DATA = window.DATA || {};
window.DATA.banners = [
  {
    "image": "img/banners/banner-01.jpg",
    "alt": "Three men outside an orange building wearing Shop Republic vertical-striped polo shirts in black and burgundy.",
    "focus": "center 30%",
    "link": "products.html?category=men"
  },
  {
    "image": "img/banners/banner-02.jpg",
    "alt": "Two men on the street in Shop Republic striped polo shirts, one black and white, one burgundy and white.",
    "focus": "center 35%",
    "link": "products.html?category=men&sub=striped-polo"
  },
  {
    "image": "img/banners/banner-03.jpg",
    "alt": "Two men seated beneath a sculpture wearing Shop Republic shirts in navy and pale blue.",
    "focus": "center 40%",
    "link": "products.html?category=men"
  },
  {
    "image": "img/banners/banner-04.jpg",
    "alt": "Man beside a tree in an open white Shop Republic short-sleeve shirt worn over a black tee.",
    "focus": "center 30%",
    "link": "products.html?category=men&sub=short-sleeve"
  },
  {
    "image": "img/banners/banner-05.jpg",
    "alt": "Back view of a man in a rust and cream striped Shop Republic polo shirt facing a metal sculpture.",
    "focus": "center 40%",
    "link": "products.html?category=men&sub=striped-polo"
  },
  {
    "image": "img/banners/banner-06.jpg",
    "alt": "Three men standing by a van in Shop Republic striped polo shirts.",
    "focus": "center 45%",
    "link": "products.html?category=men&sub=striped-polo"
  },
  {
    "image": "img/banners/banner-07.jpg",
    "alt": "Man with arms crossed in a burgundy striped Shop Republic polo shirt, metal horse sculpture behind him.",
    "focus": "center 55%",
    "link": "products.html?category=men&sub=striped-polo"
  },
  {
    "image": "img/banners/banner-08.jpg",
    "alt": "Man seated in a pale blue linen Shop Republic shirt in front of a metal eagle sculpture.",
    "focus": "center 55%",
    "link": "products.html?category=men"
  },
  {
    "image": "img/banners/banner-09.jpg",
    "alt": "Man in a plum textured Shop Republic short-sleeve shirt against a grey studio backdrop.",
    "focus": "center 35%",
    "link": "products.html?category=men&sub=short-sleeve"
  },
  {
    "image": "img/banners/banner-10.jpg",
    "alt": "Man in a black textured Shop Republic short-sleeve shirt standing in a green garden.",
    "focus": "center 40%",
    "link": "products.html?category=men&sub=short-sleeve"
  },
  {
    "image": "img/banners/banner-11.jpg",
    "alt": "Close-up of a pale blue linen Shop Republic shirt with a gold watch.",
    "focus": "center 45%",
    "link": "products.html?category=men"
  }
];
