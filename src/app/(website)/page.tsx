import { ProductGrid } from "@/components/product/product-grid";
import SectionHeader from "@/components/section/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTrendingProducts } from '@/data/product-data';

export default function Home() {
  const trendingProducts = getTrendingProducts();
  return (
    <>
      <div
        className=" h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/images/hero.webp)` }}
      >
        <div className="flex justify-center items-center h-full flex-col gap-y-5">
          <h1 className="text-white text-[35px] md:text-[45px] lg:text-[56px] leading-[64px] tracking-[10px] md:tracking-[20px] text-center font-avenir">
            EFFORTLESS FASHION HIRE
          </h1>

          <Button
            variant="link"
            className="underline text-white leading-[20px] tracking-[20%] text-[20px] font-nimbus uppercase"
          >
            <Link href="/login">Browse to Edit</Link>
          </Button>
        </div>
      </div>
      <div className="h-[300vh] bg-white">
        <SectionHeader />
          <ProductGrid title="TRENDING NOW" subtitle="EXPLORE THE EDIT" products={trendingProducts} />
      </div>
    </>
  );
}
