import Link from "next/link"
import type { Product } from "@/types/product"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductGrid({ title, subtitle, products }: ProductGridProps) {
  return (
    <section className="py-16 container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-[48px] tracking-[20px] mb-2">{title}</h2>
        {subtitle && (
          <div className="flex justify-center">
            <Link href="#" className="text-sm tracking-widest border-b border-black pb-1">
              {subtitle}
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="flex">
            <div className="w-full flex flex-col h-full">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
