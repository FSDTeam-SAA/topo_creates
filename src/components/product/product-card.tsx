import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="group flex flex-col flex-grow">
        <div className="overflow-hidden mb-4 aspect-[2/3] w-full relative">
          <Image
            src={product.images[0]?.src || "/placeholder.svg"}
            alt={product.images[0]?.alt || "Product image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="text-center space-y-1 mt-auto">
          <h3 className="text-lg tracking-widest">{product.name}</h3>
          <p className="text-sm tracking-wider">
            RENT ${product.price} | RRP ${Math.round(product.price * 3.5)}
          </p>
        </div>
      </Link>
    </div>
  )
}
