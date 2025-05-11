import type { Product } from "@/types/product"

// Main product data
export const mainProduct: Product = {
  id: "1",
  name: "DRESS NAME",
  price: 99,
  images: [
    { src: "/images/card 2.1.webp", alt: "Black dress front view" },
    { src: "/images/card 2.2.webp", alt: "Black dress side view" },
    { src: "/images/card 2.3.webp", alt: "Black dress back view" },
    { src: "/images/card 2.4.webp", alt: "Black dress detail view" },
  ],
  sizes: ["XS", "S", "M"],
  defaultSize: "S",
  rentalFee: 220.0,
  insuranceFee: 8.0,
  shippingFee: 10.0,
  slug: "dress-name",
  description: "Elegant black dress perfect for formal occasions and evening events.",
}

// Styled by you products
export const styledByYouProducts: Product[] = [
  {
    id: "2",
    name: "WEDDING GUEST READY",
    price: 89,
    images: [
      { src: "/images/card 6.1.JPG", alt: "Navy blue backless dress - front" },
      { src: "/images/card 6.3.JPG", alt: "Navy blue backless dress - back" },
      { src: "/images/card 6.2.JPG", alt: "Navy blue backless dress - detail" },
    ],
    sizes: ["XS", "S", "M", "L"],
    rentalFee: 180.0,
    insuranceFee: 8.0,
    shippingFee: 10.0,
    slug: "wedding-guest-ready",
    description: "Perfect navy blue dress for wedding guests and special occasions.",
  },
  {
    id: "3",
    name: "COCKTAIL HOUR",
    price: 79,
    images: [
      { src: "/images/card 1.1.jpg", alt: "White cocktail dress - front" },
      { src: "/images/card 1.2.jfif", alt: "White cocktail dress - side" },
      { src: "/images/card 1.3.webp", alt: "White cocktail dress - back" },
    ],
    sizes: ["XS", "S", "M"],
    rentalFee: 160.0,
    insuranceFee: 8.0,
    shippingFee: 10.0,
    slug: "cocktail-hour",
    description: "Stylish white cocktail dress for evening events and parties.",
  },
  {
    id: "4",
    name: "THE BOLD EDIT",
    price: 109,
    images: [
      { src: "/images/card 3.1.JPG", alt: "Gold sequin dress - front" },
      { src: "/images/card 3.2.JPG", alt: "Gold sequin dress - back" },
      { src: "/images/card 3.3.JPG", alt: "Gold sequin dress - detail" },
    ],
    sizes: ["S", "M", "L"],
    rentalFee: 220.0,
    insuranceFee: 8.0,
    shippingFee: 10.0,
    slug: "the-bold-edit",
    description: "Eye-catching gold sequin dress for making a statement.",
  },
  {
    id: "5",
    name: "FORMALS & GALAS",
    price: 129,
    images: [
      { src: "/images/card 4.1.webp", alt: "Coral formal gown - front" },
      { src: "/images/card 4.2.jpg", alt: "Coral formal gown - side" },
      { src: "/images/card 6.2.JPG", alt: "Coral formal gown - back" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rentalFee: 260.0,
    insuranceFee: 8.0,
    shippingFee: 10.0,
    slug: "formals-galas",
    description: "Elegant coral gown perfect for formal events and galas.",
  },
  {
    id: "6",
    name: "LAST-MINUTE LOOKS",
    price: 69,
    images: [
      { src: "/images/card 7.1.JPG", alt: "White and mint dresses - front" },
      { src: "/images/card 7.2.JPG", alt: "White and mint dresses - side" },
      { src: "/images/card 7.3.JPG", alt: "White and mint dresses - back" },
    ],
    sizes: ["XS", "S", "M"],
    rentalFee: 140.0,
    insuranceFee: 8.0,
    shippingFee: 10.0,
    slug: "last-minute-looks",
    description: "Versatile dresses for those last-minute events and occasions.",
  },
]

// All products combined for easy lookup
export const allProducts: Product[] = [mainProduct, ...styledByYouProducts]

// Function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug)
}

// Function to get trending products
export function getTrendingProducts(): Product[] {
  return allProducts.slice(0, 5) // Return first 5 products as trending
}
