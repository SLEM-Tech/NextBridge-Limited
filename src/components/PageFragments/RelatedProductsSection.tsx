import React, { useRef, useState } from "react";
import CustomSwiper from "../CustomSwiper";
import HomeApplianceCard from "../Cards/HomeApplianceCard";
import { Product, homeApplianceProductData } from "@constants";
import { useGetProductQuery } from "../config/features/api";
import { useCategories, useProductsByCategory } from "../lib/woocommerce";
import ProductCard2 from "../Cards/ProductCard2";
import { Loader } from "@src/app/(Home)/_components/SortedProducts";
import Carousel from "../Reusables/Carousel";

interface RelatedProductsSectionProps {
  productCategoryId: string;
}

const RelatedProductsSection = ({
  productCategoryId,
}: RelatedProductsSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Woo commerce API Product
  const {
    data: categoryProducts,
    isLoading: categoryProductsWpIsLoading,
    isError: categoryProductsIsError,
  } = useProductsByCategory(productCategoryId);

  const CategoryProducts: ProductType[] = categoryProducts;
  const TotalCategoryProducts = CategoryProducts?.length;

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCategoryProducts - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };
  return (
    <div className="mt-1 slg:mt-3 w-full pt-2 pb-8 px-3 slg:px-6 mb-24 border-t border-brand-border">
      <div className="flex items-end justify-between gap-6 pt-8 pb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary-100 font-semibold mb-2">
            You may also like
          </p>
          <h4 className="font-serif italic text-2xl sm:text-3xl font-bold text-white">
            Related Products
          </h4>
        </div>
      </div>
      <div className="mt-6">
        <Carousel
          totalDataNumber={TotalCategoryProducts}
          maxScrollTotal={maxScrollTotal}
          scrollLeftTotal={scrollLeftTotal}
          handleNext={handleNext}
          handlePrev={handlePrev}>
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar pb-2">
            {categoryProductsWpIsLoading ?
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[200px] sm:w-[230px] animate-pulse rounded-xl border border-brand-border bg-surface overflow-hidden p-3">
                  <div className="aspect-square bg-white/5 rounded-lg" />
                  <div className="pt-4">
                    <div className="h-4 bg-white/5 rounded w-2/3 mb-3" />
                    <div className="h-3 bg-white/5 rounded w-1/2 mb-5" />
                    <div className="h-8 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              ))
            : CategoryProducts?.map((product) => (
                <div
                  key={product?.id}
                  className="shrink-0 w-[200px] sm:w-[230px]">
                  <ProductCard2
                    id={product?.id}
                    image={product?.images[0]?.src}
                    oldAmount={product?.regular_price}
                    newAmount={product?.price}
                    description={product?.name}
                  />
                </div>
              ))
            }
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedProductsSection;
