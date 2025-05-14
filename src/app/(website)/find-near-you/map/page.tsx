import HowItWork from "@/components/HowItWork";
import FindNearYou from "../_components/find-near-you";
import MapView from "../_components/map-view";
import { ProductGrid } from "@/components/product/product-grid";
import { getTrendingProducts } from "@/data/product-data";
import ViewToggle from "../_components/view-toggle";

export default function MapPage() {
  const trendingProducts = getTrendingProducts();
  return (
    <main className=" min-h-screen bg-white">
      <FindNearYou />
      <section className="container mx-auto">
        <ViewToggle />
      </section>

      <MapView />

      <HowItWork />
      <ProductGrid
        title="TRENDING NOW"
        subtitle="EXPLORE THE EDIT"
        products={trendingProducts}
      />
    </main>
  );
}
