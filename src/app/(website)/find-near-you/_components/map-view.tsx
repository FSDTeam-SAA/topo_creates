import {
  ApiProduct,
  ProductCardData,
  normalizeProducts,
} from "../utility/normalizeProducts";
import ProductCard from "../_components/product-card";

interface MapViewProps {
  products?: ApiProduct[] | null;
}

export default function MapView({ products }: MapViewProps) {
  const normalizedProducts: ProductCardData[] = normalizeProducts(products);

  return (
    <div className="relative w-full h-[500px] bg-gray-100">
      <p className="absolute top-4 left-4 bg-white p-2 shadow">
        Showing {normalizedProducts.length} dresses on the map
      </p>

      {/* Hidden render for build safety */}
      {normalizedProducts.map((p) => (
        <div key={p.id} className="hidden">
          {p.name}
        </div>
      ))}
    </div>
  );
}

// 🟢 Extra Component: Product list handled here
MapView.List = function MapViewList({ products }: MapViewProps) {
  const normalizedProducts: ProductCardData[] = normalizeProducts(products);

  return (
    <>
      {normalizedProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
};
