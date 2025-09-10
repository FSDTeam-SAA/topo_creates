import { styledByYouProducts } from "@/data/product-data";
import Image from "next/image";
import Link from "next/link";

const StyledByYou = () => {
  return (
    <div>
      <div className="container mx-auto pt-16">
        <div className="text-center mb-8">
          <h2 className="headerClass mb-2">STYLED BY YOU</h2>
          <div className="flex justify-center">
            <Link
              href="#"
              className="text-sm tracking-widest border-b border-black pb-1"
            >
              EXPLORE THE EDIT
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container">
          {styledByYouProducts.map((styledProduct) => (
            <div key={styledProduct.id} className="flex flex-col">
              <Link href={`/product/${styledProduct.slug}`} className="group">
                <div className="overflow-hidden mb-4">
                  <Image
                    src={styledProduct.images[0]?.src || "/placeholder.svg"}
                    alt={styledProduct.images[0]?.alt || "Product image"}
                    width={360}
                    height={360}
                    className="w-full aspect-square object-cover "
                  />
                </div>
                <div className="text-center">
                  <h3 className="uppercase tracking-widest text-sm">
                    {styledProduct.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyledByYou;
